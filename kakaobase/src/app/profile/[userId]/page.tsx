import Header from '@/components/common/header/Header';
import NavBar from '@/components/common/NavBar';
import Wrapper from '@/components/profile/Wrapper';

export default function Page() {
  return (
    <div className="flex flex-col h-screen">
      <Header label="프로필" />
      <Wrapper />
      <NavBar />
    </div>
  );
}
