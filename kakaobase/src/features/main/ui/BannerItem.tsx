import Image from 'next/image';
import { BannerItem as BT } from '../types/Banner';
import { memo } from 'react';

const BannerItem = memo(function BannerItem({ item }: { item: BT }) {
  return (
    <div className="flex-shrink-0 w-full flex items-center p-4 gap-6">
      <div className="relative w-40 aspect-video">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, 160px"
          className="object-cover rounded"
        />
      </div>
      <div className="mt-2 text-sm flex flex-col">
        <span className="font-bold">[{item.name}]</span>
        <a href={item.url} className="underline break-all whitespace-pre-wrap">
          {item.description}
        </a>
      </div>
    </div>
  );
});

export default BannerItem;
