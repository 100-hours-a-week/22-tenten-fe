'use client';
import Header from '@/widgets/header/Header';
import Loading from '@/shared/ui/Loading';
import MiddleBar from '@/features/feeds/components/MiddleBar';
import CommentInput from '@/features/feeds/comments/components/CommentInput';
import ListRouter from '@/features/feeds/components/ListRouter';
import PostCard from '@/features/feeds/components/PostCard';
import usePostDetail from '@/features/feeds/posts/hooks/usePostDetailHook';

export default function Page({ params }: { params: { postId: number } }) {
  const id = Number(params.postId);
  const { post, loading } = usePostDetail({ id });

  if (loading) return <Loading />;
  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="flex flex-col h-screen">
      <Header label="게시글 상세" />
      <div
        className="overflow-y-auto flex flex-col min-h-0 my-[4.5rem]"
        data-scroll-area
      >
        <div className="my-4">
          <PostCard post={post} />
        </div>
        <MiddleBar />
        <ListRouter />
      </div>
      <CommentInput />
    </div>
  );
}
