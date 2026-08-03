import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class OperationDto {
  @IsIn(['insert', 'delete'])
  action!: 'insert' | 'delete';

  @IsNumber()
  position!: number;

  @IsOptional()
  @IsString()
  text?: string;
}
