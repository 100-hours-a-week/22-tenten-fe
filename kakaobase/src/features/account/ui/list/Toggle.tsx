import clsx from 'clsx';

export type profileListType = '게시글' | '댓글' | '좋아요';

function Button({
  label,
  type,
  setType,
}: {
  label: profileListType;
  type: profileListType;
  setType: (type: profileListType) => void;
}) {
  return (
    <div
      className={clsx(
        'rounded-full cursor-pointer',
        type === label
          ? 'bg-myBlue text-textOnBlue'
          : 'text-textColor hover:bg-textOpacity50'
      )}
      onClick={() => setType(label)}
    >
      <div className="text-sm px-4 py-1">{label}</div>
    </div>
  );
}

export default function Toggle({
  isMe,
  type,
  setType,
}: {
  isMe: boolean;
  type: profileListType;
  setType: (type: profileListType) => void;
}) {
  return (
    <div className="flex gap-2 bg-containerColor px-1 py-1 rounded-full">
      <Button label="게시글" type={type} setType={setType} />
      <Button label="댓글" type={type} setType={setType} />
      {isMe && <Button label="좋아요" type={type} setType={setType} />}
    </div>
  );
}
