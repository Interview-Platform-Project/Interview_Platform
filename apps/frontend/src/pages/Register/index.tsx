import { RegisterForm } from '@/features/register';
import { AuthInfo } from '@/widgets/AuthInfo';

export function RegisterPage() {
  return (
    <AuthInfo>
      <RegisterForm />
    </AuthInfo>
  );
}
