import { IsEmail, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Некорректный email' })
  @IsString({ message: 'Должно быть строкой' })
  email!: string;

  @Length(8, 128, { message: 'Не менее 8 и не более 128 символов' })
  @IsString({ message: 'Должно быть строкой' })
  password!: string;
}
