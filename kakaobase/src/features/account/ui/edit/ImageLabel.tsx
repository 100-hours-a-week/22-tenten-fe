import LoadingSmall from '@/shared/ui/LoadingSmall';
import { CirclePlus } from 'lucide-react';
import Image from 'next/image';

export default function ImageLabel({
  image,
  loading,
}: {
  image: string | null;
  loading: boolean;
}) {
  return (
    <label
      htmlFor="image-upload"
      className="flex relative gap-2 items-center justify-center cursor-pointer"
    >
      {!image || image === 'null' ? (
        <div className="w-16 h-16 block bg-textOpacity50 rounded-lg"></div>
      ) : (
        <div className="relative aspect-square w-16 h-16">
          <Image
            src={image}
            alt="프로필 이미지"
            className="rounded-lg object-cover"
            fill
            sizes="(max-width : 480px) 64px, 13vw"
          />
        </div>
      )}
      <div className="w-16 h-16 aspect-square bg-textOpacity50 absolute flex rounded-lg justify-center">
        {loading ? (
          <LoadingSmall />
        ) : (
          <CirclePlus className="w-4 text-textColor self-center" />
        )}
      </div>
    </label>
  );
}
