import Header from '@/widgets/header/Header';
import CommentInput from '@/features/feeds/comments/ui/CommentInput';
import PostDetail from '@/features/feeds/ui/PostDetail';

export default function Page({ params }: { params: { postId: number } }) {
  const id = Number(params.postId);

  return (
    <div className="flex flex-col h-screen scroll-none">
      <Header label="게시글 상세" />
      <div
        className="flex-grow flex flex-col items-center w-full overflow-y-auto mb-16"
        data-scroll-area
      >
        <PostDetail postId={id} />
      </div>
      <CommentInput />
    </div>
  );
}
