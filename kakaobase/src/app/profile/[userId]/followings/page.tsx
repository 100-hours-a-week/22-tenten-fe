import Header from '@/components/common/header/Header';
import NavBar from '@/components/common/NavBar';
import UserFollowingList from '@/components/social/UserFollowingList';

export default function Page({ params }: { params: { userId: number } }) {
  return (
    <div className="flex flex-col h-screen">
      <Header label="팔로잉 목록" />
      <UserFollowingList userId={params.userId} />
      <NavBar />
    </div>
  );
}
