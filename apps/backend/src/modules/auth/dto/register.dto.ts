import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail({}, { message: 'Некорректный email' })
  @IsString({ message: 'Должно быть строкой' })
  email!: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 100, { message: 'Не менее 4 и не более 100 символов' })
  name!: string;

  @ApiProperty({ example: 'p@ssw0rd', minLength: 8 })
  @Length(8, 128, { message: 'Не менее 8 и не более 128 символов' })
  @IsString({ message: 'Должно быть строкой' })
  readonly password!: string;
}
