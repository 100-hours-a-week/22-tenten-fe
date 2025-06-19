import Header from '@/widgets/header/Header';
import NavBar from '@/widgets/navbar/NavBar';
import MyPageWrapper from '@/features/account/ui/MyPageWrapper';

export default function Page({ params }: { params: { userId: number } }) {
  return (
    <div className="flex flex-col h-screen">
      <Header label="프로필" />
      <MyPageWrapper userId={params.userId} />
      <NavBar />
    </div>
  );
}
