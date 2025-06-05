'use client';
import { useRouter } from 'next/navigation';
import SubmitButton from '../common/button/SubmitButton';
import CountInfo from './CountInfo';
import UserInfo from './UserInfo';
import { useEffect, useState } from 'react';
import Toggle from './Toggle';
import PostList from '../post/list/PostList';
import HandleButton from '../common/button/HandleButton';
import ProfileModal from './QR/ProfileModal';

export default function Wrapper() {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [isMe, setIsMe] = useState(true);
  const [isFollowing, setFollowing] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const chatRoomId = 1;

  function handleModal() {
    setOpen((prev) => !prev);
  }
  function handleFollow() {
    setFollowing((prev) => !prev);
  }
  function navEdit() {
    router.push(`${userId}/edit`);
  }
  function navChatRoom() {
    router.push(`/chat/${chatRoomId}`);
  }

  useEffect(() => {
    const id = localStorage.getItem('userId');
    if (id) setUserId(id);
  });

  return (
    <div className="flex flex-col items-center text-textColor min-h-0 mb-[4rem] mt-[5rem] gap-[1.25rem]">
      <UserInfo />
      <CountInfo />

      {isMe ? (
        <div className="flex gap-4">
          <SubmitButton text="프로필 편집" onClick={navEdit} />
          <SubmitButton text="프로필 공유" onClick={handleModal} />
        </div>
      ) : (
        <div className="flex gap-4">
          <HandleButton
            isActive={isFollowing}
            activeLabel="언팔로우"
            idleLabel="팔로우"
            onClick={handleFollow}
          />
          <SubmitButton text="채팅하기" onClick={navChatRoom} />
        </div>
      )}

      <div className="flex flex-col gap-2 items-center min-h-0">
        <Toggle isMe={isMe} />
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
