import Header from '@/widgets/header/Header';
import NavBar from '@/widgets/navbar/NavBar';
import UserFollowerList from '@/features/follows/ui/UserFollowerList';

export default function Page({ params }: { params: { userId: number } }) {
  return (
    <div className="flex flex-col h-screen">
      <Header label="팔로워 목록" />
      <UserFollowerList userId={params.userId} />
      <NavBar />
    </div>
  );
}
