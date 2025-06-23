import Header from '@/widgets/header/Header';
import NavBar from '@/widgets/navbar/NavBar';
import UserFollowerList from '@/features/follows/ui/UserFollowerList';

export default function Page({ params }: { params: { userId: number } }) {
  return (
    <div className="flex flex-col h-screen scroll-none">
      <Header label="팔로워 목록" />
      <div
        className="flex overflow-y-auto flex-grow flex-col my-24 mx-6 p-2 rounded-lg bg-containerColor"
        data-scroll-area
      >
        <UserFollowerList userId={params.userId} />
      </div>
      <NavBar />
    </div>
  );
}
