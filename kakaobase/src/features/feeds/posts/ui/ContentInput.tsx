import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { NewPostData } from '../hooks/usePostEditorForm';
import HelperText from './HelperText';
import { useUserStore } from '@/entities/users/stores/userStore';

export default function ContentInput({
  register,
  errors,
}: {
  register: UseFormRegister<NewPostData>;
  errors: FieldErrors<NewPostData>;
}) {
  const { nickname } = useUserStore();
  return (
    <div className="w-full">
      <div className="text-md font-bold">{nickname}</div>

      <textarea
        {...register('content')}
        placeholder="지금 무슨 일이 발생하고 있나요?"
        className="w-full focus:outline-none bg-transparent text-xs resize-none max-h-80"
        rows={1}
        onInput={(e) => {
          e.currentTarget.style.height = 'auto';
          e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
        }}
      />

      <HelperText errorMessage={errors.content?.message || ''} />
    </div>
  );
}
