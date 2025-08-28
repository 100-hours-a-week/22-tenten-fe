'use client';
import { House, MessageCircle, Bell } from 'lucide-react';
import NavItem from './NavItem';
import NavItemProfile from './NavItemProfile';
import dynamic from 'next/dynamic';
const AlarmBadgeClient = dynamic(() => import('./AlarmBadgeClient'));

export default function NavBar() {
  return (
    <div className="flex absolute w-full max-w-[480px] border-t-[1px] border-textOpacity50 bottom-0 mx-auto lg:self-start bg-bgColor text-textColor shadow-md">
      <div className=" bg-bgColor flex justify-around items-center w-full z-50">
        <NavItem icon={House} path="/" />
        <NavItem icon={MessageCircle} path="/chat" />
        <AlarmBadgeClient>
          <NavItem icon={Bell} path="/alarm" />
        </AlarmBadgeClient>
        <NavItemProfile />
      </div>
    </div>
  );
}
