import { CirclePlus } from 'lucide-react';
import Image from 'next/image';

export default function ImageInput() {
  return (
    <div>
      <label
        htmlFor="image-upload"
        className="flex relative gap-2 items-center justify-center cursor-pointer"
      >
        <Image
          src="/logo_square.svg"
          width={60}
          height={60}
          alt="프로필 이미지"
          className="block"
        />
        <div className="w-full aspect-[1/1] bg-textOpacity50 absolute flex rounded-lg justify-center">
          <CirclePlus className="w-4 text-textColor self-center" />
        </div>
      </label>

      <input
        id="image-upload"
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          //이미지 세팅
        }}
      />
    </div>
  );
}
