import { IsIn, IsString, ValidateNested } from 'class-validator';
import { OperationDto } from './operation.dto';
import { Type } from 'class-transformer';

export class FullUpdateDto {
  /** Полная замена состояния редактора (например, при первой синхронизации). */
  @IsIn(['full'])
  type!: 'full';

  /** Язык программирования, выбранный в редакторе. */
  @IsString()
  language!: string;

  /** Полное содержимое редактора. */
  @IsString()
  content!: string;
}

export class OperationUpdateDto {
  /** Точечное изменение (insert/delete), применяемое поверх текущего состояния. */
  @IsIn(['operation'])
  type!: 'operation';

  @ValidateNested()
  @Type(() => OperationDto)
  operation!: OperationDto;
}

export type CodeUpdateDto = FullUpdateDto | OperationUpdateDto;