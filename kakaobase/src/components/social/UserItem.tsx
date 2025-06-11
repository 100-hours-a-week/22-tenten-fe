'use client';
import { UserBasic } from '@/types/user/UserBasic';
import { User } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function UserItem({ data }: { data: UserBasic }) {
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
      {data.image_url !== null ? (
        <Image
          width={28}
          height={28}
          src={data.image_url}
          alt="프로필 이미지"
        />
      ) : (
        <User
          width={28}
          height={28}
          className="bg-textOpacity50 rounded-md p-1"
        />
      )}
      <div className="flex text-sm">
        <div>
          {data.nickname} / {data.name}
        </div>
      </div>
    </div>
  );
}
