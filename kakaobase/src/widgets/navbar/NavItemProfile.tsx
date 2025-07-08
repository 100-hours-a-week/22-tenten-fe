import Image from 'next/image';
import NavItem from './NavItem';
import { User } from 'lucide-react';
import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import { useUserStore } from '@/entities/users/stores/userStore';

export default function NavItemProfile() {
  const pathName = usePathname();
  const router = useRouter();
  const { userId, imageUrl } = useUserStore();
  const isActive = pathName.includes('/profile');
  const path = `/profile/${userId}`;

  function navMyProfile() {
    if (userId === 0 || !userId) {
      router.push('/unauthorized');
    } else {
      router.push(path);
    }
    const sc = document.querySelector<HTMLElement>('[data-scroll-area]');
    sc?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div
      className={`w-full h-16 rounded-md flex items-center text-center justify-center cursor-pointer ${
        isActive
          ? 'bg-containerColor'
          : 'hover:bg-containerColor hover:text-textColor'
      }`}
      onClick={navMyProfile}
    >
      {imageUrl === '' || imageUrl === null ? (
        <NavItem icon={User} path={path} />
      ) : (
        <Image
          src={imageUrl}
          width={12}
          height={12}
          alt="profile"
          className={clsx(
            'w-6 h-6 transition-colors rounded-md',
            isActive ? 'text-myBlue' : 'text-iconColor hover:text-textColor'
          )}
        />
      )}
    </div>
  );
}
