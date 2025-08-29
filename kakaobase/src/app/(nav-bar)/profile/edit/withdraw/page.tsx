import Header from '@/widgets/header/Header';
import WithdrawWrapper from '@/features/account/ui/withdraw/WithdrawWrapper';

export default function Page() {
  return (
    <div className="flex flex-col h-screen">
      <Header label="회원 탈퇴" />
      <WithdrawWrapper />
    </div>
  );
}
