import SubmitButtonSmall2 from '@/shared/ui/button/SubmitButtonSmall2';

export default function DeleteModal({
  closeFunction,
  okFunction,
}: {
  closeFunction: () => void;
  okFunction: () => void;
}) {
  return (
    <div className="flex gap-2 rounded-r-2xl">
      <SubmitButtonSmall2 label="삭제" execute={okFunction} />
      <SubmitButtonSmall2 label="취소" execute={closeFunction} />
    </div>
  );
}
