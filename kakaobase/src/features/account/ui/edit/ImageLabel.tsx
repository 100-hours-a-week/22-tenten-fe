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
        <Image
          src={image}
          width={64}
          height={64}
          alt="프로필 이미지"
          className="block rounded-lg aspect-square"
        />
      )}
      <div className="w-full aspect-[1/1] bg-textOpacity50 absolute flex rounded-lg justify-center">
        {loading ? (
          <LoadingSmall />
        ) : (
          <CirclePlus className="w-4 text-textColor self-center" />
        )}
      </div>
    </label>
  );
}
