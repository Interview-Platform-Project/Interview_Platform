export function mapAuthErrorMessage(message: string): string {
  switch (message) {
    case 'Invalid email or password':
      return 'Неверный email или пароль';
    case 'Email already registered':
      return 'Пользователь с таким email уже зарегистрирован';
    default:
      return message;
  }
}
