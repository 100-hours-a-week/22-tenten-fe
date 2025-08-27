import Header from '@/widgets/header/Header';
import UserLikeList from '@/features/likes/ui/UserLikeList';
import { PostType } from '@/features/feeds/types/post';

export default function Page({
  params,
}: {
  params: { postId: number; postType: PostType };
}) {
  return (
    <div className="flex flex-col h-screen scroll-none">
      <Header label="좋아요 목록" />
      <div
        className="flex overflow-y-auto flex-grow flex-col mt-8 mx-6 rounded-lg bg-containerColor"
        data-scroll-area
      >
        <UserLikeList feedId={params.postId} feedType={params.postType} />
      </div>
    </div>
  );
}
