import { Register } from '@/features/Auth/Register/ui';
import { AuthInfo } from '@/widgets/AuthInfo/ui';

export function RegisterPage() {
  return (
    <AuthInfo>
      <Register />
    </AuthInfo>
  );
}
