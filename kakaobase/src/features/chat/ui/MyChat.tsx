import formatDate from '@/features/feeds/lib/formatDate';

export default function MyChat({ text, time }: { text: string; time: string }) {
  return (
    <div className="relative px-6 py-2 flex flex-col gap-2 w-full">
      <div className="flex gap-2 justify-end items-end">
        <div className="text-xs opacity-40">{formatDate(time, false)}</div>
        <div className="text-sm px-3 py-2 rounded-xl max-w-[64%] flex bg-myBlue text-textOnBlue whitespace-pre-wrap break-all">
          {text}
        </div>
      </div>
    </div>
  );
}
