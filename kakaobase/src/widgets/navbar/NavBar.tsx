'use client';
import { usePathname } from 'next/navigation';
import { House, MessageCircle, Bell } from 'lucide-react';
import NavItem from './NavItem';
import NavItemProfile from './NavItemProfile';
import { useUserStore } from '@/entities/users/stores/userStore';
import NavItemPost from './NavItemPost';

export default function NavBar() {
  const path = usePathname();
  const { course, selectedCourse } = useUserStore();

  return (
    <div className="flex sticky w-full max-w-[480px] border-t-[1px] border-textOpacity50 bottom-0 mx-auto lg:self-start bg-bgColor text-textColor shadow-md">
      <div className="h-16 bg-bgColor flex justify-between items-end px-8 py-5 w-full z-50">
        <div className="flex gap-12">
          <NavItem icon={House} path="/" />
          {/* <NavItem icon={MessageCircle} path="/chat" /> */}
        </div>
        {path.includes('main') &&
          (selectedCourse === course || selectedCourse === 'ALL') && (
            <NavItemPost />
          )}

        <div className="flex gap-12">
          {/* <NavItem icon={Bell} path="/alarm" /> */}
          <NavItemProfile />
        </div>
      </div>
    </div>
  );
}
