import useRoutings from '@/shared/hooks/useRoutings';
import Image from 'next/image';
import { User } from 'lucide-react';

export default function UserProfileImage({
  id,
  profileUrl,
}: {
  id: number;
  profileUrl?: string;
}) {
  const { goProfile } = useRoutings();

  return (
    <div
      className="flex w-8 h-7 rounded-lg bg-innerContainerColor justify-center items-center cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        goProfile(id);
      }}
    >
      {profileUrl ? (
        <div className="relative w-8 h-8">
          <Image
            src={profileUrl}
            alt="프로필"
            className="rounded-lg object-cover aspect-square"
            priority
            fill
            sizes="(max-width:480px) 32px, 10vw"
          />
        </div>
      ) : (
        <User className="text-textColor" width={20} height={20} />
      )}
    </div>
  );
}
