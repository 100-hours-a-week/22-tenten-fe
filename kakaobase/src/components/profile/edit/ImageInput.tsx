import LoadingSmall from '@/components/common/loading/LoadingSmall';
import { imageData } from '@/hooks/profile/useImageEditHook';
import { CirclePlus } from 'lucide-react';
import Image from 'next/image';
import { UseFormHandleSubmit, UseFormSetValue } from 'react-hook-form';

interface ImageInputProps {
  setValue: UseFormSetValue<imageData>;
  handleSubmit: UseFormHandleSubmit<imageData>;
  onSubmit: (data: imageData) => Promise<void>;
  loading: boolean;
  image: string | null;
}

export default function ImageInput({
  setValue,
  handleSubmit,
  onSubmit,
  loading,
  image,
}: ImageInputProps) {
  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setValue('imageFile', file, { shouldValidate: true });
      const url = URL.createObjectURL(file);
      handleSubmit(onSubmit)();
      console.log(image);
    }
  }

  return (
    <div>
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
            className="block rounded-lg"
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

      <input
        id="image-upload"
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        className="hidden"
        onChange={handleImage}
      />
    </div>
  );
}
