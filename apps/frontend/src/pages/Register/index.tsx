import { AuthByEmail } from '@/features/Auth/Auth-by-email/ui';
import { AuthInfo } from '@/widgets/AuthInfo/ui';

export function RegisterPage() {
  return (
    <AuthInfo>
      <AuthByEmail />
    </AuthInfo>
  );
}
