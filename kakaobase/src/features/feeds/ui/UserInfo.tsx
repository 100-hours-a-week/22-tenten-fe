import { Trash2, User } from 'lucide-react';
import FollowButtonSmall from '@/features/follows/ui/FollowButtonSmall';
import formatDate from '../lib/formatDate';
import Image from 'next/image';
import { usePostDeleteHook } from '../posts/hooks/usePostDeleteHook';
import { useCommentDeleteHook } from '../comments/hooks/useCommentDeleteHook';
import { useRecommentDeleteHook } from '../comments/hooks/useRecommentDeleteHook';
import DeleteModal from './DeleteModal';
import { useEffect, useState } from 'react';
import { PostEntity } from '../types/post';
import useRoutings from '@/shared/hooks/useRoutings';

export function UserProfile({ post }: { post: PostEntity }) {
  const { goProfile } = useRoutings();

  return (
    <div
      className="flex w-8 h-7 rounded-lg bg-innerContainerColor justify-center items-center cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        goProfile(post.userId);
      }}
    >
      {post.userProfileUrl ? (
        <div className="relative w-8 h-8">
          <Image
            src={post.userProfileUrl}
            alt="프로필"
            className="rounded-lg object-cover aspect-square"
            priority
            fill
            sizes="(max-width:480px) 32px, 10vw"
          />
        </div>
      ) : (
        <User className="text-textColor" width={20} height={20} />
      )}
    </div>
  );
}

export function UserInfo({ post }: { post: PostEntity }) {
  const id = Number(post.id);
  const [isOpen, setOpen] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);
  const { deletePostExecute } = usePostDeleteHook({ id });
  const { deleteCommentExecute } = useCommentDeleteHook({ id });
  const { deleteRecommentExecute } = useRecommentDeleteHook({ id });
  const { goProfile } = useRoutings();

  function closeModal() {
    setOpen(false);
  }
  function openModal() {
    setOpen(true);
  }
  function deleteFeed() {
    if (post.type === 'post') deletePostExecute();
    else if (post.type === 'comment') deleteCommentExecute();
    else deleteRecommentExecute();
    closeModal();
  }

  useEffect(() => {
    const handleResize = () => {
      setIsNarrow(window.innerWidth < 340);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex justify-between gap-2">
      <div className="flex gap-2 items-center min-w-0">
        <div
          className="cursor-pointer font-bold text-sm overflow-hidden text-ellipsis whitespace-nowrap"
          onClick={(e) => {
            e.stopPropagation();
            goProfile(post.userId);
          }}
        >
          {post.nickname}
        </div>
        {post.isMine ? null : (
          <FollowButtonSmall isFollowing={post.isFollowing} id={post.userId} />
        )}
      </div>
      <div
        className="flex gap-2 align-center justify-center flex-shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex self-center text-xs">
          {formatDate(post.createdAt, isNarrow)}
        </div>
        {post.isMine &&
          (!isOpen ? (
            <Trash2
              width={16}
              height={16}
              className="self-center cursor-pointer"
              onClick={openModal}
            />
          ) : (
            <DeleteModal closeFunction={closeModal} okFunction={deleteFeed} />
          ))}
      </div>
    </div>
  );
}
