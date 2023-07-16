import { FC } from 'react';
import AuthForm from '@/components/auth-form';

interface LoginProps {}

const Login: FC<LoginProps> = ({}) => {
  return (
    <main className="container flex h-screen w-screen flex-col items-center justify-center">
      <AuthForm />
    </main>
  );
};

export default Login;
