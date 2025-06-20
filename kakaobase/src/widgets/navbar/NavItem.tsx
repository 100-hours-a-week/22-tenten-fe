import clsx from 'clsx';
import { LucideIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function NavItem({
  icon: Icon,
  path,
}: {
  icon: LucideIcon;
  path?: string;
}) {
  const pathName = usePathname();
  const router = useRouter();

  const isActive = pathName === path;

  return (
    <button onClick={path ? () => router.push(path) : undefined}>
      <Icon
        className={clsx(
          'w-6 h-6 transition-colors cursor-pointer',
          isActive ? 'text-myBlue' : 'text-iconColor'
        )}
      />
    </button>
  );
}
