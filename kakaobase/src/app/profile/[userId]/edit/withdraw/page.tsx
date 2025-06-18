import Header from '@/shared/ui/header/Header';
import NavBar from '@/shared/ui/NavBar';
import WithdrawWrapper from '@/features/account/components/withdraw/WithdrawWrapper';

export default function Page() {
  return (
    <div>
      <div>
        <Header label="회원 탈퇴" />
        <WithdrawWrapper />
        <NavBar />
      </div>
    </div>
  );
}
