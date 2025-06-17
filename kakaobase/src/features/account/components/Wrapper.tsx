'use client';
import SubmitButton from '../../../components/common/button/SubmitButton';
import CountInfo from './CountInfo';
import UserInfo from './UserInfo';
import Toggle, { profileListType } from './list/Toggle';
import ListRouter from './list/ListRouter';
import ProfileModal from './QR/ProfileModal';
import useUserInfoHook from '../hooks/useUserInfoHook';
import HandleButton from '../../../components/common/button/HandleButton';
import Loading from '../../../components/common/loading/Loading';
import { useFollowToggle } from '@/hooks/user/useFollowHook';
import { useState } from 'react';

export default function Wrapper({ userId }: { userId: number }) {
  const { data, isPending, handleModal, navEdit, isOpen } = useUserInfoHook({
    userId,
  });
  const { following, toggleFollow } = useFollowToggle(
    data?.is_followed ?? false,
    userId
  );
  const [type, setType] = useState<profileListType>('게시글');

  if (isPending) {
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

      <div className="flex w-full flex-col gap-2 items-center min-h-0">
        <Toggle isMe={data.is_me} type={type} setType={setType} />
        <div
          data-scroll-area
          className="flex w-full overflow-y-auto flex-grow flex-col"
        >
          <ListRouter type={type} userId={userId} />
        </div>
      </div>
      <ProfileModal isOpen={isOpen} onClose={handleModal} />
    </div>
  );
}
