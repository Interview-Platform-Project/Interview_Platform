import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email({ error: 'Некорректный email адрес' }),
  password: z.string().min(8, { error: 'Пароль должен быть не менее 8 символов' }),
  remember: z.boolean(),
});

export const loginSchemaResolver = zodResolver(loginSchema);

export type LoginSchema = z.infer<typeof loginSchema>;
export type LoginResponse = {
  user: {
    id: string;
    email: string;
  };
};
