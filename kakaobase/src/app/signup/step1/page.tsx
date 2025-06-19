import Header from '@/widgets/header/Header';
import SignupStep1Form from '@/features/auth/ui/SignupStep1Form';

export default function Page() {
  return (
    <div className="overflow-y-auto">
      <Header label="회원가입" />
      <div className="mt-20">
        <SignupStep1Form />
      </div>
    </div>
  );
}
