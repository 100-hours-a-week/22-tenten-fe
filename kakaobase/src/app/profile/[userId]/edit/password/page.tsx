import Header from '@/widgets/header/Header';
import NavBar from '@/widgets/navbar/NavBar';
import PasswordEditWrapper from '@/features/account/components/password/PasswordEditWrapper';

export default function Page() {
  return (
    <div>
      <div>
        <Header label="비밀번호 변경" />
        <PasswordEditWrapper />
        <NavBar />
      </div>
    </div>
  );
}
