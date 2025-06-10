'use client';
import SubmitButton from '../common/button/SubmitButton';
import CountInfo from './CountInfo';
import UserInfo from './UserInfo';
import Toggle from './Toggle';
import PostList from '../post/list/PostList';
import HandleButton from '../common/button/HandleButton';
import ProfileModal from './QR/ProfileModal';
import useUserInfoHook from '@/hooks/profile/useUserInfoHook';
import Loading from '../common/loading/Loading';
import { useFollowToggle } from '@/hooks/user/useFollowHook';

export default function Wrapper({ userId }: { userId: number }) {
  const { data, isLoading, handleModal, navEdit, isOpen } = useUserInfoHook({
    userId,
  });
  const { following, toggleFollow } = useFollowToggle(
    data?.is_followed ?? false,
    userId
  );

  if (isLoading) {
    return (
      <div className="flex mt-20 justify-center">
        <Loading />
      </div>
    );
  }
  if (!data) {
    return <div>데이터 없음</div>;
  }

  return (
    <div className="flex flex-col items-center text-textColor min-h-0 mb-[4rem] mt-[5rem] gap-[1.25rem]">
      <UserInfo data={data} />
      <CountInfo data={data} />

      {data.is_me ? (
        <div className="flex gap-4">
          <SubmitButton text="프로필 편집" onClick={navEdit} />
          <SubmitButton text="프로필 공유" onClick={handleModal} />
        </div>
      ) : (
        <div className="flex gap-4">
          <HandleButton
            isActive={following}
            activeLabel="언팔로우"
            idleLabel="팔로우"
            onClick={toggleFollow}
          />
        </div>
      )}

      <div className="flex flex-col gap-2 items-center min-h-0">
        <Toggle isMe={data.is_me} />
        <div
          data-scroll-area
          className="flex overflow-y-auto flex-grow flex-col"
        >
          <PostList />
        </div>
      </div>
      <ProfileModal isOpen={isOpen} onClose={handleModal} />
    </div>
  );
}
