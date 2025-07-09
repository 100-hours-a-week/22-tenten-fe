import formatDate from '@/features/feeds/lib/formatDate';

export default function MyChat() {
  const text =
    '안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요';
  return (
    <div className="relative px-6 py-2 flex flex-col gap-2 w-full">
      <div className="flex gap-2 justify-end items-end">
        <div className="text-xs opacity-40">
          {formatDate('2025-07-02', false)}
        </div>
        <div className="text-sm px-3 py-2 rounded-xl max-w-[64%] flex bg-myBlue text-textOnBlue">
          {text}
        </div>
      </div>
    </div>
  );
}
