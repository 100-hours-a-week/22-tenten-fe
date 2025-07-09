import { useAlarmStore } from '@/features/alarm/stores/alarmStore';
import { cn } from '@/shared/lib/utils';
import clsx from 'clsx';
import { Bell, LucideIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function NavItem({
  icon: Icon,
  path,
}: {
  icon: LucideIcon;
  path: string;
}) {
  const pathName = usePathname();
  const router = useRouter();
  const isActive = pathName === path;
  const { cnt } = useAlarmStore();

  const handleClick = () => {
    if (path) router.push(path);
    const sc = document.querySelector<HTMLElement>('[data-scroll-area]');
    if (path.includes('chat')) {
      sc?.scrollTo({ top: sc.scrollHeight, behavior: 'smooth' });
    } else sc?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={path ? () => handleClick() : undefined}
      className={`w-full h-16 rounded-md flex items-center text-center justify-center ${
        isActive ? 'bg-containerColor' : 'hover:bg-containerColor'
      }`}
    >
      <Icon
        className={clsx(
          'w-6 h-6 transition-colors cursor-pointer',
          isActive ? 'text-myBlue' : 'text-iconColor hover:text-textColor'
        )}
      />
      {Icon === Bell && cnt > 0 && (
        <div className="w-4 h-4 absolute rounded-full bg-myBlue text-textOnBlue text-[0.625rem] mb-5 ml-4">
          {cnt}
        </div>
      )}
    </button>
  );
}
