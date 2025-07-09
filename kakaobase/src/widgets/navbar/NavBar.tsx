'use client';
import { House, MessageCircle, Bell } from 'lucide-react';
import NavItem from './NavItem';
import NavItemProfile from './NavItemProfile';

export default function NavBar() {
  return (
    <div className="flex fixed w-full max-w-[480px] border-t-[1px] border-textOpacity50 bottom-0 mx-auto lg:self-start bg-bgColor text-textColor shadow-md">
      <div className=" bg-bgColor flex justify-around items-center w-full z-50">
        <NavItem icon={House} path="/" />
        <NavItem icon={MessageCircle} path="/chat" />
        <NavItem icon={Bell} path="/alarm" />
        <NavItemProfile />
      </div>
    </div>
  );
}
