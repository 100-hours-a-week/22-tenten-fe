import Header from '@/components/common/header/Header';
import LoginForm from '@/features/auth/components/LoginForm';

export default function Page() {
  return (
    <div>
      <Header label="로그인" />
      <LoginForm />
    </div>
  );
}
