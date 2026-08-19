import { LoginForm } from '@/features/login';
import { AuthInfo } from '@/widgets/AuthInfo';

export function LoginPage() {
  return (
    <AuthInfo>
      <LoginForm />
    </AuthInfo>
  );
}
