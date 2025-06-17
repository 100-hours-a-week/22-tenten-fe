import Header from '@/components/common/header/Header';
import NavBar from '@/components/common/NavBar';
import Wrapper from '@/features/account/components/Wrapper';

export default function Page({ params }: { params: { userId: number } }) {
  return (
    <div className="flex flex-col h-screen">
      <Header label="프로필" />
      <Wrapper userId={params.userId} />
      <NavBar />
    </div>
  );
}
