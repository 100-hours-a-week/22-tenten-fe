import Header from '@/widgets/header/Header';
import NavBar from '@/widgets/navbar/NavBar';
import UserFollowingList from '@/features/follows/ui/UserFollowingList';

export default function Page({ params }: { params: { userId: number } }) {
  return (
    <div className="flex flex-col h-screen">
      <Header label="팔로잉 목록" />
      <UserFollowingList userId={params.userId} />
      <NavBar />
    </div>
  );
}
