import LoadingSmall from '@/shared/ui/LoadingSmall';
import { imageData } from '../../hooks/useImageEditHook';
import { CirclePlus } from 'lucide-react';
import Image from 'next/image';
import { UseFormHandleSubmit, UseFormSetValue } from 'react-hook-form';
import ImageLabel from './ImageLabel';

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
      handleSubmit(onSubmit)();
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

      <input
        id="image-upload"
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp, image/avif"
        className="hidden"
        onChange={handleImage}
      />
    </div>
  );
}
