import Header from '@/shared/ui/header/Header';
import SignupStep2Form from '@/features/auth/components/SignupStep2Form';

export default function Page() {
  return (
    <div className="overflow-y-auto">
      <Header label="회원가입" />
      <div className="mt-20">
        <SignupStep2Form />
      </div>
    </div>
  );
}
