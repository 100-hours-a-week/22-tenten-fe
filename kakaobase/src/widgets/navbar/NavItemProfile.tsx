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

  function navMyProfile() {
    router.push(`/profile/${userId}`);
  }

  return (
    <div className="flex" onClick={navMyProfile}>
      {imageUrl === '' || imageUrl === null ? (
        <NavItem icon={User} />
      ) : (
        <Image
          src={imageUrl}
          width={12}
          height={12}
          alt="profile"
          className={clsx(
            'w-6 h-6 transition-colors cursor-pointer rounded-md',
            isActive ? 'text-myBlue' : 'text-iconColor'
          )}
        />
      )}
    </div>
  );
}
