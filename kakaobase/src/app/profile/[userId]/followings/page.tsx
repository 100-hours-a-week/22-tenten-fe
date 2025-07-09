import Header from '@/widgets/header/Header';
import NavBar from '@/widgets/navbar/NavBar';
import UserFollowingList from '@/features/follows/ui/UserFollowingList';

export default function Page({ params }: { params: { userId: number } }) {
  return (
    <div className="flex flex-col h-screen scroll-none">
      <Header label="팔로잉 목록" />
      <div
        className="flex overflow-y-auto flex-grow flex-col mt-8 mb-24 mx-6 p-2 rounded-lg bg-containerColor animate-slide-in"
        data-scroll-area
      >
        <UserFollowingList userId={params.userId} />
      </div>
      <NavBar />
    </div>
  );
}
