import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  // @ApiProperty({example: 'user@mail.ru', description: 'Почта'})
  // @IsString({message: 'Должно быть строкой'})
  // @IsEmail({}, {message: "Некорректный email"})
  // readonly email: string;
  // @ApiProperty({example: '12345', description: 'пароль'})
  // @IsString({message: 'Должно быть строкой'})
  // @Length(4, 16, {message: 'Не меньше 4 и не больше 16'})
  // readonly password: string;
  @ApiProperty({example: 'user@example.com'})
  @IsEmail({}, {message: 'Некорректный email'})
  @IsString({message: 'Должно быть строкой'})
  email!: string;

  @ApiProperty({example: 'John Doe'})
  @IsString({message: 'Должно быть строкой'})
  @Length(4,100, {message: 'Не менее 4 и не более 100 символов'})
  name!: string;

  @ApiProperty({ example: 'p@ssw0rd', minLength: 8 })
  @Length(8,128, {message: 'Не менее 8 и не более 128 символов'})
  @IsString({message: 'Должно быть строкой'})
  readonly password!: string;
}
