import { Injectable } from '@nestjs/common';
import { CodeUpdateDto } from './dto/code-update.dto';
import { OperationDto } from './dto/operation.dto';
import { EditorStateDto } from './dto/editor-state.dto';

@Injectable()
export class EditorService {
  private readonly rooms = new Map<string, EditorStateDto>();

  updateCode(roomId: string, data: CodeUpdateDto): EditorStateDto {
    let state: EditorStateDto = { content: '', language: '' };

    if (data.type === 'full') {
      state = {
        content: data.content,
        language: data.language,
      };

      this.rooms.set(roomId, state);
    }

    if (data.type === 'operation') {
      state = this.applyOperation(roomId, data.operation);
    }

    console.log('Current editor state:');
    console.log(state);

    return state;
  }

  private applyOperation(roomId: string, operation: OperationDto): EditorStateDto {
    const state = this.getState(roomId);

    let updatedCode = state.content;

    switch (operation.action) {
      case 'insert':
        updatedCode =
          state.content.slice(0, operation.position) +
          (operation.text ?? '') +
          state.content.slice(operation.position);

        break;

      case 'delete': {
        const deletedText = state.content.slice(
          operation.position,
          operation.position + (operation.text?.length ?? 0),
        );

        if (deletedText !== operation.text) {
          console.log('WARNING: code mismatch');
        }

        updatedCode =
          state.content.slice(0, operation.position) +
          state.content.slice(operation.position + (operation.text?.length ?? 0));

        break;
      }
    }

    const updatedState = {
      ...state,
      content: updatedCode,
    };

    this.rooms.set(roomId, updatedState);

    return updatedState;
  }

  getState(roomId: string): EditorStateDto {
    return (
      this.rooms.get(roomId) ?? {
        content: '',
        language: 'typescript',
      }
    );
  }
}