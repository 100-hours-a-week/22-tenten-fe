import Header from '@/components/common/header/Header';
import NavBar from '@/components/common/NavBar';
import Wrapper from '@/features/account/components/withdraw/Wrapper';

export default function Page() {
  return (
    <div>
      <div>
        <Header label="회원 탈퇴" />
        <Wrapper />
        <NavBar />
      </div>
    </div>
  );
}
