import Header from '@/shared/ui/header/Header';
import NavBar from '@/shared/ui/NavBar';
import Wrapper from '@/features/account/components/password/Wrapper';

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
