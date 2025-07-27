import Image from 'next/image';
import { UserBasic } from '@/entities/users/types/UserBasic';

export default function AlarmProfile({ sender }: { sender: UserBasic }) {
  const imageUrl = sender.image_url;

  if (imageUrl === null)
    return (
      <div className="relative w-10 h-10">
        <Image
          src="/logo_square.png"
          alt="프로필"
          fill
          sizes="(max-width : 480px) 40px, 10vw"
          className="flex rounded-xl border-innerContainerColor border-2 p-1"
        />
      </div>
    );
  else
    return (
      <div className="relative w-10 h-10">
        <Image
          src={imageUrl}
          alt="프로필"
          fill
          sizes="(max-width : 480px) 40px, 10vw"
          className="object-cover flex rounded-xl"
        />
      </div>
    );
}
