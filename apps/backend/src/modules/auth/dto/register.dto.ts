import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Некорректный email' })
  @IsString({ message: 'Должно быть строкой' })
  email!: string;

  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 100, { message: 'Не менее 4 и не более 100 символов' })
  name!: string;

  @Length(8, 128, { message: 'Не менее 8 и не более 128 символов' })
  @IsString({ message: 'Должно быть строкой' })
  readonly password!: string;
}
