import Header from '@/widgets/header/Header';
import CommentInput from '@/features/feeds/comments/ui/CommentInput';
import PostDetail from '@/features/feeds/ui/PostDetail';

export default function Page({ params }: { params: { postId: number } }) {
  const id = Number(params.postId);

  return (
    <div className="flex flex-col h-screen scroll-none">
      <Header label="게시글 상세" />
      <PostDetail postId={id} />
      <CommentInput />
    </div>
  );
}
