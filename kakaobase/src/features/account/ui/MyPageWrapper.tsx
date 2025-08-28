'use client';
import SubmitButton from '@/shared/ui/button/SubmitButton';
import UserInfo from './UserInfo';
import Toggle, { profileListType } from './list/Toggle';
import ListRouter from './list/ListRouter';
import FollowButtonLarge from '@/features/follows/ui/FollowButtonLarge';
import Loading from '@/shared/ui/Loading';
import { useFollowToggle } from '@/features/follows/hooks/useFollowHook';
import { useState } from 'react';
import useUserInfo from '../hooks/useUserInfo';
import dynamic from 'next/dynamic';
const RoutingButton = dynamic(
  () => import('@/shared/ui/button/RoutingButton'),
  { ssr: false }
);
const ProfileModal = dynamic(() => import('./QR/ProfileModal'), { ssr: false });

export default function MyPageWrapper({ userId }: { userId: number }) {
  const { data, isPending, handleModal, isOpen } = useUserInfo({
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
      className="flex w-full overflow-y-auto flex-grow flex-col w-full pb-16"
    >
      <div className="flex flex-col items-center text-textColor gap-4">
        <div className="w-full">
          <div className="mx-6">
            <UserInfo data={data} />
          </div>
        </div>

        {data.is_me ? (
          <div className="flex gap-4">
            <RoutingButton text="프로필 편집" path="/profile/edit" />
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
