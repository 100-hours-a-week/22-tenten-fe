'use client';
import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UserItem() {
  const userId = 1;
  const router = useRouter();
  function navProfile() {
    router.push(`/profile/${userId}`);
  }
  return (
    <div
      className="flex text-textColor bg-innerContainerColor w-full items-center p-2 rounded-lg gap-2 cursor-pointer"
      onClick={navProfile}
    >
      <User
        width={28}
        height={28}
        className="bg-textOpacity50 rounded-md p-1"
      />
      <div className="flex text-sm">
        <div>daisy.kim / 김도현</div>
      </div>
    </div>
  );
}
