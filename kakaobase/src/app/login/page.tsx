import HeaderMain from '@/widgets/header/HeaderMain';
import LoginForm from '@/features/auth/ui/LoginForm';

export default function Page() {
  return (
    <div className="flex flex-col h-screen">
      <HeaderMain />
      <LoginForm />
    </div>
  );
}
