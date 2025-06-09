import Header from '@/components/common/header/Header';
import NavBar from '@/components/common/NavBar';
import UserFollowList from '@/components/social/UserFollowList';

export default function Page({ params }: { params: { userId: number } }) {
  return (
    <div className="flex flex-col h-screen">
      <Header label="팔로워 목록" />
      <UserFollowList userId={params.userId} />
      <NavBar />
    </div>
  );
}
