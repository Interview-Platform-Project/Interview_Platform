import { IsString } from 'class-validator';

export class JoinRoomDto {
  /** Идентификатор комнаты интервью, к которой подключается клиент. */
  @IsString()
  roomId!: string;
}