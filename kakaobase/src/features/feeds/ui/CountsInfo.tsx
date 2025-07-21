import { useLikeToggle } from '@/features/likes/hooks/useLikeHook';
import { PostEntity } from '@/features/feeds/types/post';
import { Heart, MessageCircle } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import RecommentHandler from './RecommentHandler';

const iconSize = 16;

function CommentInfo({ commentCount }: { commentCount: number }) {
  return (
    <div className="flex gap-1 justify-center">
      <MessageCircle
        width={iconSize}
        height={iconSize}
        className="cursor-pointer"
      />
      <div className="w-6 self-center">{commentCount}</div>
    </div>
  );
}

function LikeInfo({
  likeCount,
  condition,
  onClickFunction,
  onClickNav,
}: {
  likeCount: number;
  condition: boolean;
  onClickFunction: (e: React.MouseEvent<SVGElement>) => void;
  onClickNav: (e: React.MouseEvent<HTMLElement>) => void;
}) {
  return (
    <div className="flex gap-1 items-center">
      <Heart
        width={iconSize}
        height={iconSize}
        onClick={(e) => {
          e.stopPropagation();
          onClickFunction(e);
        }}
        fill={condition ? '#ff465c' : 'transparent'}
        strokeWidth={condition ? 0 : 2}
        className="cursor-pointer"
      />
      <div
        className="flex w-6 self-center"
        onClick={(e) => {
          onClickNav(e);
        }}
      >
        {likeCount}
      </div>
    </div>
  );
}

export default function CountsInfo({ post }: { post: PostEntity }) {
  const { isLiked, likeCount, toggleLike } = useLikeToggle(
    post.isLiked,
    post.likeCount,
    post.id,
    post.type
  );

  const path = usePathname();
  const router = useRouter();
  function navLikeList(e: React.MouseEvent<HTMLElement>) {
    if (post.type === 'post') {
      sessionStorage.setItem('scrollToPostId', String(post.id));
    }
    e.stopPropagation();
    router.push(`/likes/${post.type}/${post.id}`);
  }

  return (
    <div className="flex text-sm items-center">
      <LikeInfo
        likeCount={likeCount}
        condition={isLiked}
        onClickFunction={toggleLike}
        onClickNav={navLikeList}
      />
      {(post.type === 'post' || post.type === 'comment') && (
        <CommentInfo
          commentCount={'commentCount' in post ? post.commentCount : 0}
        />
      )}
      {post.type === 'comment' && !path.includes('profile') && (
        <RecommentHandler post={post} />
      )}
    </div>
  );
}
