import Header from '@/widgets/header/Header';
import NavBar from '@/widgets/navbar/NavBar';
import UserLikeList from '@/features/likes/ui/UserLikeList';

export default function Page({
  params,
}: {
  params: { postId: number; postType: string };
}) {
  return (
    <div className="flex flex-col h-screen scroll-none">
      <Header label="좋아요 목록" />
      <div
        className="flex overflow-y-auto flex-grow flex-col mt-8 mb-24 mx-6 rounded-lg bg-containerColor"
        data-scroll-area
      >
        <UserLikeList postId={params.postId} postType={params.postType} />
      </div>
      <NavBar />
    </div>
  );
}
