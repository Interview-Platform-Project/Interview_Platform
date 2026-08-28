import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { CodeUpdateDto } from './dto/code-update.dto';
import { EditorService } from './editor.service';
import { JoinRoomDto } from './dto/join-room.dto';

/**
 * Realtime-редактор кода: комнаты интервью (roomId), полная синхронизация
 * состояния и точечные операции (insert/delete).
 *
 * Полный контракт событий (payload'ы, схемы) описан в `asyncapi/asyncapi.yaml`
 * и доступен для просмотра на /ws-docs.
 */
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EditorGateway implements OnGatewayConnection {
  constructor(private readonly editorService: EditorService) {}

  handleConnection(client: Socket) {
    const roomId = this.resolveRoomIdFromHandshake(client);

    if (roomId) {
      this.joinRoom(client, roomId);
    }
  }

  @SubscribeMessage('join_room')
  handleJoinRoom(@MessageBody() data: JoinRoomDto, @ConnectedSocket() client: Socket) {
    this.joinRoom(client, data.roomId);
  }

  @SubscribeMessage('leave_room')
  handleLeaveRoom(@ConnectedSocket() client: Socket) {
    this.leaveRoom(client);
  }

  @SubscribeMessage('code_update')
  handleCodeUpdate(
    @MessageBody() rawData: string | CodeUpdateDto,
    @ConnectedSocket() client: Socket,
  ) {
    // TODO: Postman отправляет payload как строку.
    // При работе с socket.io-client данные будут приходить объектом.
    const data = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;

    const roomId = this.getRoomId(client);

    if (!roomId) {
      return;
    }

    const state = this.editorService.updateCode(roomId, data);

    client.to(roomId).emit('code_update', state);
  }

  private joinRoom(client: Socket, roomId: string) {
    this.leaveRoom(client);

    client.data.roomId = roomId;
    client.join(roomId);

    client.emit('code_state', this.editorService.getState(roomId));
  }

  private leaveRoom(client: Socket) {
    const roomId = this.getRoomId(client);

    if (!roomId) {
      return;
    }

    client.leave(roomId);
    client.data.roomId = undefined;
  }

  private resolveRoomIdFromHandshake(client: Socket): string | undefined {
    const roomId = client.handshake.auth.roomId ?? client.handshake.query.roomId;

    return Array.isArray(roomId) ? roomId[0] : roomId;
  }

  private getRoomId(client: Socket): string | undefined {
    return client.data.roomId as string | undefined;
  }
}
