import Header from '@/components/common/header/Header';
import NavBar from '@/components/common/NavBar';
import Wrapper from '@/components/profile/password/Wrapper';

export default function Page() {
  return (
    <div>
      <div>
        <Header label="비밀번호 변경" />
        <Wrapper />
        <NavBar />
      </div>
    </div>
  );
}
