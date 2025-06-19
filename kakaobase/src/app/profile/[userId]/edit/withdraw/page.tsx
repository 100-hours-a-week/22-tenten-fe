import Header from '@/widgets/header/Header';
import NavBar from '@/widgets/navbar/NavBar';
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
