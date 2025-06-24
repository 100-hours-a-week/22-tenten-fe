import Header from '@/widgets/header/Header';
import NavBar from '@/widgets/navbar/NavBar';
import WithdrawWrapper from '@/features/account/ui/withdraw/WithdrawWrapper';

export default function Page() {
  return (
    <div className="flex flex-col h-screen">
      <Header label="회원 탈퇴" />
      <WithdrawWrapper />
      <NavBar />
    </div>
  );
}
