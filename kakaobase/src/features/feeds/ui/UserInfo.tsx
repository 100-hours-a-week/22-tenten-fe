import { Trash2 } from 'lucide-react';
import FollowButtonSmall from '@/features/follows/ui/FollowButtonSmall';
import formatDate from '../lib/formatDate';
import { usePostDeleteHook } from '../posts/hooks/usePostDeleteHook';
import { useCommentDeleteHook } from '../comments/hooks/useCommentDeleteHook';
import { useRecommentDeleteHook } from '../comments/hooks/useRecommentDeleteHook';
import DeleteModal from './DeleteModal';
import { useState } from 'react';
import { PostEntity } from '../types/post';
import useRoutings from '@/shared/hooks/useRoutings';

export default function UserInfo({ post }: { post: PostEntity }) {
  const id = Number(post.id);
  const [isOpen, setOpen] = useState(false);
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
          {formatDate(post.createdAt)}
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
