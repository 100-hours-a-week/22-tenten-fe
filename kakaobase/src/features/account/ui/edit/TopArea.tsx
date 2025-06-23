'use client';

import ReadOnlyUserInfo from './ReadOnlyUserInfo';
import ImageInput from './ImageInput';
import useImageEditHook from '../../hooks/useImageEditHook';
import { useUserStore } from '@/entities/users/stores/userStore';
import { courseMapEngToKor } from '@/shared/lib/courseMap';

export default function TopArea() {
  const {
    loading,
    handleSubmit,
    formState: { errors },
    onSubmit,
    setValue,
    previewUrl,
  } = useImageEditHook();
  const { name, nickname, course } = useUserStore();

  return (
    <div className="flex flex-col w-full">
      <div className="text-[0.625rem] text-redHeart h-4">
        {errors.imageFile?.message || ''}
      </div>
      <div className="flex gap-4 items-center">
        <ImageInput
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          setValue={setValue}
          loading={loading}
          image={previewUrl}
        />
        <div className="flex flex-col gap-3">
          <ReadOnlyUserInfo label="이름" value={`${nickname} / ${name}`} />
          <ReadOnlyUserInfo label="과정명" value={courseMapEngToKor[course]} />
        </div>
      </div>
    </div>
  );
}
