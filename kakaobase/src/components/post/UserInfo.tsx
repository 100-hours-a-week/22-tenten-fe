import { PostState } from '@/stores/postStore';
import { ShieldAlert, Trash2, User } from 'lucide-react';
import FollowButtonSmall from '../user/FollowButtonSmall';
import formatDate from '@/lib/formatDate';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useDeleteHook } from '@/hooks/post/useDeleteHook';
import DeleteModal from './DeleteModal';

export function UserProfile({ post }: { post: PostState }) {
  const router = useRouter();
  function navProfile() {
    router.push(`/profile/${post.id}`);
  }
  return (
    <div
      className="flex w-8 h-7 rounded-lg bg-innerContainerColor justify-center items-center cursor-pointer"
      onClick={navProfile}
    >
      {post.userProfileUrl ? (
        <Image
          src={post.userProfileUrl}
          width={32}
          height={32}
          alt="프로필"
          className="rounded-lg"
          priority
        />
      ) : (
        <User className="text-textColor" width={20} height={20} />
      )}
    </div>
  );
}

export function UserInfo({ post }: { post: PostState }) {
  const router = useRouter();
  function navProfile() {
    router.push(`/profile/${post.userId}`);
  }
  const { isOpened, openModal, closeModal, deletePost } = useDeleteHook();

  return (
    <div className="flex justify-between gap-2">
      <div className="flex gap-2 items-center min-w-0">
        <div
          className="cursor-pointer font-bold text-sm overflow-hidden text-ellipsis whitespace-nowrap"
          onClick={navProfile}
        >
          {post.nickname}
        </div>
        {post.isMine ? null : (
          <FollowButtonSmall isFollowing={post.isFollowing} />
        )}
      </div>
      <div className="flex gap-2 align-center justify-center flex-shrink-0">
        <div className="flex self-center text-xs">
          {formatDate(post.createdAt)}
        </div>
        {post.isMine ? (
          <Trash2
            width={16}
            height={16}
            className="self-center cursor-pointer"
            onClick={openModal}
          />
        ) : (
          <ShieldAlert
            width={16}
            height={16}
            className="self-center cursor-pointer"
            onClick={() => router.push('/report')}
          />
        )}
      </div>
      {isOpened ? (
        <DeleteModal closeFunction={closeModal} okFunction={deletePost} />
      ) : null}
    </div>
  );
}
