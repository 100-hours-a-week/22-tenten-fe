import Header from '@/widgets/header/Header';
import SignupStep1Form from '@/features/auth/ui/SignupStep1Form';

export default function Page() {
  return (
    <div className="flex flex-col h-screen">
      <Header label="회원가입" />
      <SignupStep1Form />
    </div>
  );
}
