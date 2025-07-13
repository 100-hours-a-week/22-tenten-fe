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
      <ImageLabel image={image} loading={loading} />
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
