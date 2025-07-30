import formatDate from '@/features/feeds/lib/formatDate';
import Image from 'next/image';

export default function BotChat({
  text,
  time,
}: {
  text: string;
  time: string;
}) {
  return (
    <div className="relative px-6 py-4 flex flex-col gap-2 w-full">
      <div className="flex gap-2 justify-start items-end">
        <div className="relative w-6 h-6">
          <Image
            src="/roro.png"
            fill
            sizes="(max-width : 480px) 24px, 10vw"
            alt="roro"
            className="rounded-md object-cover"
          />
        </div>
        <div className="text-sm px-3 py-2 rounded-xl max-w-[64%] flex bg-myLightBlue text-textOnLight whitespace-pre-wrap break-all">
          {text}
        </div>
        <div className="text-xs opacity-40">{formatDate(time)}</div>
      </div>
    </div>
  );
}
