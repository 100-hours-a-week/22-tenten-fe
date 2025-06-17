import Header from '@/components/common/header/Header';
import NavBar from '@/components/common/NavBar';
import UserFollowerList from '@/features/follows/components/UserFollowerList';

export default function Page({ params }: { params: { userId: number } }) {
  return (
    <div className="flex flex-col h-screen">
      <Header label="팔로워 목록" />
      <UserFollowerList userId={params.userId} />
      <NavBar />
    </div>
  );
}
