import { useLikeToggle } from '@/features/likes/hooks/useLikeHook';
import { PostEntity } from '@/features/feeds/types/post';
import { Heart, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { commentFormStateStore } from '../comments/stores/commentFormStateStore';
import useCommentOrRecomment from '../comments/hooks/useCommentOrRecomment';

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

export default function CountsInfo({
  post,
  handleRecommentVisibility,
  isOpen,
}: {
  post: PostEntity;
  handleRecommentVisibility?: () => void;
  isOpen?: boolean;
}) {
  const { isLiked, likeCount, toggleLike } = useLikeToggle(
    post.isLiked,
    post.likeCount,
    post.id,
    post.type
  );

  const { handleRecomment } = useCommentOrRecomment({
    post,
    handleRecommentVisibility,
    isOpen,
  });

  const { isWritingRecomment, commentId } = commentFormStateStore();

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
      {post.type === 'comment' && (
        <div className="text-xs flex gap-4 ">
          <div onClick={handleRecomment}>
            {isWritingRecomment && commentId === post.id ? '취소' : '답글 달기'}
          </div>
          <div
            onClick={() => {
              handleRecommentVisibility?.();
            }}
          >
            {isOpen ? '숨기기' : '대댓글 보기'}
          </div>
        </div>
      )}
    </div>
  );
}
