import { IsIn, IsString, ValidateNested } from 'class-validator';
import { OperationDto } from './operation.dto';
import { Type } from 'class-transformer';

export class FullUpdateDto {
  @IsIn(['full'])
  type!: 'full';

  @IsString()
  language!: string;

  @IsString()
  content!: string;
}

export class OperationUpdateDto {
  @IsIn(['operation'])
  type!: 'operation';

  @ValidateNested()
  @Type(() => OperationDto)
  operation!: OperationDto;
}

export type CodeUpdateDto = FullUpdateDto | OperationUpdateDto;
