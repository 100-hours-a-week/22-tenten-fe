import { Trash2, User } from 'lucide-react';
import FollowButtonSmall from '@/features/follows/components/FollowButtonSmall';
import formatDate from '../lib/formatDate';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { usePostDeleteHook } from '../posts/hooks/usePostDeleteHook';
import { useCommentDeleteHook } from '../comments/hooks/useCommentDeleteHook';
import { useRecommentDeleteHook } from '../comments/hooks/useRecommentDeleteHook';
import DeleteModal from '@/features/feeds/components/DeleteModal';
import { useEffect, useState } from 'react';
import { PostEntity } from '@/features/feeds/types/post';

export function UserProfile({ post }: { post: PostEntity }) {
  const router = useRouter();
  function navProfile() {
    router.push(`/profile/${post.userId}`);
  }
  return (
    <div
      className="flex w-8 h-7 rounded-lg bg-innerContainerColor justify-center items-center cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        navProfile();
      }}
    >
      {post.userProfileUrl ? (
        <Image
          src={post.userProfileUrl}
          width={32}
          height={32}
          alt="프로필"
          className="rounded-lg aspect-square"
          priority
        />
      ) : (
        <User className="text-textColor" width={20} height={20} />
      )}
    </div>
  );
}

export function UserInfo({ post }: { post: PostEntity }) {
  const id = Number(post.id);
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);
  const { deletePostExecute } = usePostDeleteHook({ id });
  const { deleteCommentExecute } = useCommentDeleteHook({ id });
  const { deleteRecommentExecute } = useRecommentDeleteHook({ id });

  function navProfile() {
    router.push(`/profile/${post.userId}`);
  }
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
            navProfile();
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
