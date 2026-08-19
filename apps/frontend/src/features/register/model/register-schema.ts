import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string().min(1, { error: 'Полное имя является обязательным' }),
    email: z.email({ error: 'Некорректный email адрес' }),
    password: z.string().min(8, { error: 'Пароль должен быть не менее 8 символов' }),
    passwordConfirm: z
      .string()
      .min(8, { error: 'Подтверждение пароля должно быть не менее 8 символов' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Пароли не совпадают',
    path: ['passwordConfirm'],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const registerSchemaResolver = zodResolver(registerSchema);
