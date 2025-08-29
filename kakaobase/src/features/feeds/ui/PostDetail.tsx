'use client';
import Loading from '@/shared/ui/Loading';
import usePostDetail from '../posts/hooks/usePostDetailHook';
import MiddleBar from './MiddleBar';
import dynamic from 'next/dynamic';
const PostCard = dynamic(() => import('./PostCard'));
const CommentList = dynamic(() => import('../comments/ui/CommentList'));
// import PostCard from './PostCard';
// import CommentList from '../comments/ui/CommentList';

export default function PostDetail({ postId }: { postId: number }) {
  const { data, isPending } = usePostDetail({ id: postId });

  if (isPending)
    return (
      <div className="h-screen">
        <Loading />
      </div>
    );
  if (!data) return <div className="h-screen">게시글을 찾을 수 없습니다.</div>;

  return (
    <div
      className="flex-grow flex flex-col h-screen w-full overflow-y-auto"
      data-scroll-area
    >
      <div className="my-4 w-full">
        <PostCard post={data} />
      </div>
      <MiddleBar />
      <CommentList />
    </div>
  );
}
