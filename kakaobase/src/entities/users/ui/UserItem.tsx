'use client';
import { UserBasic } from '@/entities/users/types/UserBasic';
import useRoutings from '@/shared/hooks/useRoutings';
import { User } from 'lucide-react';
import Image from 'next/image';

export default function UserItem({ data }: { data: UserBasic }) {
  const { goProfile } = useRoutings();

  return (
    <div
      className="flex text-textColor bg-innerContainerColor w-full items-center p-2 rounded-lg gap-2 cursor-pointer"
      onClick={() => goProfile(data.id)}
    >
      {data.image_url !== null ? (
        <div className="relative w-7 h-7">
          <Image
            src={data.image_url}
            alt="프로필 이미지"
            className="aspect-square rounded-md object-cover"
            fill
            sizes="(max-width:480px) 48px, 10vw"
            priority
          />
        </div>
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
