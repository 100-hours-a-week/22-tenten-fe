import { Image as ImageIcon } from 'lucide-react';
import { NewPostData } from '../hooks/usePostEditorForm';
import { useEffect, useState } from 'react';
import { FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import HelperText from './HelperText';

export default function ImageInput({
  setValue,
  errors,
  watch,
}: {
  errors: FieldErrors<NewPostData>;
  setValue: UseFormSetValue<NewPostData>;
  watch: UseFormWatch<NewPostData>;
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const imageFile = watch('imageFile');

  useEffect(() => {
    if (imageFile && imageFile instanceof File) {
      const url = URL.createObjectURL(imageFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);
  return (
    <div className="w-full">
      <label
        htmlFor="image-upload"
        className="flex gap-2 items-center cursor-pointer"
      >
        <ImageIcon className="w-4 h-4" />
        <div className="text-xs px-4 py-1 bg-myLightBlue w-40 text-center rounded-full text-textOnLight">
          이미지 업로드
        </div>
      </label>

      <input
        id="image-upload"
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setValue('imageFile', file, { shouldValidate: true });
          }
        }}
      />

      {/* 이미지 미리보기 */}
      {previewUrl && (
        <div className="mt-2 flex flex-col gap-2">
          <img
            src={previewUrl}
            alt="미리보기"
            className="rounded-sm w-full h-auto object-cover"
          />
          <button
            type="button"
            onClick={() => {
              setPreviewUrl(null);
              setValue('imageFile', undefined, { shouldValidate: true });
            }}
            className="text-xs w-fit rounded-full text-redHeart underline"
          >
            사진 삭제
          </button>
        </div>
      )}
      <HelperText errorMessage={errors.imageFile?.message || ''} />
    </div>
  );
}
