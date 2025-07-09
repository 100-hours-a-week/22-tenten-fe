'use client';
import Header from '@/widgets/header/Header';
import Loading from '@/shared/ui/Loading';
import MiddleBar from '@/features/feeds/ui/MiddleBar';
import CommentInput from '@/features/feeds/comments/ui/CommentInput';
import ListRouter from '@/features/feeds/ui/ListRouter';
import PostCard from '@/features/feeds/ui/PostCard';
import usePostDetail from '@/features/feeds/posts/hooks/usePostDetailHook';
import { recommentFormStateStore } from '@/features/feeds/comments/stores/recommentFormStateStore';
import { useEffect } from 'react';

export default function Page({ params }: { params: { postId: number } }) {
  const id = Number(params.postId);
  const { data, isPending } = usePostDetail({ id });
  const { clear } = recommentFormStateStore();

  useEffect(() => {
    return () => clear();
  }, []);

  if (isPending)
    return (
      <div className="h-screen">
        <Loading />
      </div>
    );
  if (!data) return <div className="h-screen">게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="flex flex-col h-screen scroll-none">
      <Header label="게시글 상세" />
      <div
        className="flex-grow flex flex-col h-screen items-center w-full overflow-y-auto"
        data-scroll-area
      >
        <div className="flex flex-col w-full h-screen">
          <div className="my-4">
            <PostCard post={data} />
          </div>
          <MiddleBar />
          <ListRouter />
        </div>
      </div>
      <CommentInput />
    </div>
  );
}
