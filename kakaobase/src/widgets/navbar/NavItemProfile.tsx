import Image from 'next/image';
import NavItem from './NavItem';
import { User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/entities/users/stores/userStore';
import useRoutings from '@/shared/hooks/useRoutings';

export default function NavItemProfile() {
  const pathName = usePathname();
  const { goPath, goUnauthorized } = useRoutings();
  const { userId, imageUrl } = useUserStore();
  const isActive = pathName.includes('/profile');
  const path = `/profile/${userId}`;

  function navMyProfile() {
    if (userId === 0 || !userId) {
      goUnauthorized();
    } else {
      goPath(path);
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
        <div className="w-6 h-6 relative">
          <Image
            src={imageUrl}
            fill
            sizes="(max-width : 480px) 24px, 10vw"
            alt="profile"
            className="object-cover rounded-md"
          />
        </div>
      )}
    </div>
  );
}
