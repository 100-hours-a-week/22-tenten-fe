import { useLikeToggle } from '@/features/likes/hooks/useLikeHook';
import { PostEntity } from '@/entities/feeds/types/post';
import { Heart, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

function CommentInfo({ commentCount }: { commentCount: number }) {
  return (
    <div className="flex gap-1 justify-center">
      <MessageCircle width={24} height={24} className="cursor-pointer" />
      <div className="w-12 self-center">{commentCount}</div>
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
    <div className="flex gap-1">
      <Heart
        width={24}
        height={24}
        onClick={(e) => {
          e.stopPropagation();
          onClickFunction(e);
        }}
        fill={condition ? '#ff465c' : 'transparent'}
        strokeWidth={condition ? 0 : 2}
        className="cursor-pointer"
      />
      <div
        className="flex w-12 self-center"
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

  const router = useRouter();
  function navLikeList(e: React.MouseEvent<HTMLElement>) {
    if (post.type === 'post') {
      sessionStorage.setItem('scrollToPostId', String(post.id));
      sessionStorage.setItem('scrollPosition', String(window.scrollY));
    }
    e.stopPropagation();
    router.push(`/likes/${post.type}/${post.id}`);
  }

  return (
    <div className="flex gap-2 text-sm">
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
    </div>
  );
}
