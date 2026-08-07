import { Login } from '@/features/Auth/Login';
import { AuthInfo } from '@/widgets/AuthInfo';

export function LoginPage() {
  return (
    <>
      <AuthInfo>
        <Login />
      </AuthInfo>
    </>
  );
}
