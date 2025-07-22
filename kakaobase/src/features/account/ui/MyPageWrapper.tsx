'use client';
import SubmitButton from '@/shared/ui/button/SubmitButton';
import CountInfo from './CountInfo';
import UserInfo from './UserInfo';
import Toggle, { profileListType } from './list/Toggle';
import ListRouter from './list/ListRouter';
import ProfileModal from './QR/ProfileModal';
import FollowButtonLarge from '@/features/follows/ui/FollowButtonLarge';
import Loading from '@/shared/ui/Loading';
import { useFollowToggle } from '@/features/follows/hooks/useFollowHook';
import { useState } from 'react';
import useUserInfo from '../hooks/useUserInfo';

export default function MyPageWrapper({ userId }: { userId: number }) {
  const { data, isPending, handleModal, navEdit, isOpen } = useUserInfo({
    userId,
  });

  const { following, toggleFollow } = useFollowToggle(
    data?.is_followed ?? false,
    userId
  );
  const [type, setType] = useState<profileListType>('게시글');

  if (isPending) {
    return (
      <div className="flex justify-center h-screen">
        <Loading />
      </div>
    );
  }
  if (!data) {
    return <div className="h-screen">데이터 없음</div>;
  }

  return (
    <div
      data-scroll-area
      className="flex w-full overflow-y-auto flex-grow flex-col w-full"
    >
      <div className="flex flex-col items-center text-textColor gap-4">
        <div className="w-full">
          <div className="mx-6">
            <UserInfo data={data} />
          </div>
        </div>

        {data.is_me ? (
          <div className="flex gap-4">
            <SubmitButton text="프로필 편집" onClick={navEdit} />
            <SubmitButton text="프로필 공유" onClick={handleModal} />
          </div>
        ) : (
          <div className="flex gap-4">
            <FollowButtonLarge isActive={following} onClick={toggleFollow} />
          </div>
        )}

        <div className="flex w-full flex-col items-center min-h-0">
          <Toggle isMe={data.is_me} type={type} setType={setType} />
          <ListRouter type={type} userId={userId} />
        </div>
      </div>
      <ProfileModal isOpen={isOpen} onClose={handleModal} />
    </div>
  );
}
