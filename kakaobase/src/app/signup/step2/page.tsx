import Header from '@/widgets/header/Header';
import SignupStep2Form from '@/features/auth/ui/SignupStep2Form';

export default function Page() {
  return (
    <div className="flex flex-col h-screen">
      <Header label="회원가입" />
      <SignupStep2Form />
    </div>
  );
}
