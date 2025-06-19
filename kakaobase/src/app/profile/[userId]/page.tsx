import Header from '@/widgets/header/Header';
import NavBar from '@/widgets/navbar/NavBar';
import Wrapper from '@/features/account/ui/Wrapper';

export default function Page({ params }: { params: { userId: number } }) {
  return (
    <div className="flex flex-col h-screen">
      <Header label="프로필" />
      <Wrapper userId={params.userId} />
      <NavBar />
    </div>
  );
}
