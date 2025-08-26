'use client';

import ReadOnlyUserInfo from './ReadOnlyUserInfo';
import ImageInput from './ImageInputContainer';
import useImageEditHook from '../../hooks/useImageEditHook';
import { useUserStore } from '@/entities/users/stores/userStore';
import { courseMapEngToKor } from '@/shared/lib/courseMap';
import useUserInfo from '../../hooks/useUserInfo';
import LoadingSmall from '@/shared/ui/LoadingSmall';

export default function TopArea() {
  const {
    loading,
    handleSubmit,
    formState: { errors },
    onSubmit,
    setValue,
    previewUrl,
  } = useImageEditHook();
  const { userId, course } = useUserStore();
  const { data, isPending } = useUserInfo({ userId });

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
          {isPending ? (
            <LoadingSmall />
          ) : (
            <>
              <ReadOnlyUserInfo
                label="이름"
                value={`${data.nickname} / ${data.name}`}
              />
              <ReadOnlyUserInfo
                label="과정명"
                value={courseMapEngToKor[course]}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
