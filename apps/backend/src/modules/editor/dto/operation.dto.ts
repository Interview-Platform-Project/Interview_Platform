import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class OperationDto {
  /** Тип точечной операции редактирования. */
  @IsIn(['insert', 'delete'])
  action!: 'insert' | 'delete';

  /** Позиция символа в тексте, с которой применяется операция. */
  @IsNumber()
  position!: number;

  /**
   * Для "insert" — вставляемый текст. Для "delete" — ожидаемый удаляемый
   * текст (используется сервером для проверки согласованности состояния).
   */
  @IsOptional()
  @IsString()
  text?: string;
}