'use client';
import { useRouter } from 'next/navigation';
import { House, MessageCircle, Plus, Bell } from 'lucide-react';
import NavItem from './NavItem';
import NavItemProfile from './NavItemProfile';

export default function NavBar() {
  const router = useRouter();

  return (
    <div className="flex fixed w-full max-w-[480px] border-t-[1px] border-textOpacity50 bottom-0 mx-auto lg:self-start bg-bgColor text-textColor shadow-md">
      <div className="h-16 bg-bgColor flex justify-between items-end px-8 py-5 w-full z-50">
        <div className="flex gap-12">
          <NavItem icon={House} path="/" />
          {/* <NavItem icon={MessageCircle} path="/chat" /> */}
        </div>
        <button
          onClick={() => {
            router.push('/post/new');
          }}
          className="mb-2 w-16 h-16 rounded-full flex items-center justify-center bg-myBlue shadow-[0_4px_16px_rgba(44,102,255,0.6)]"
        >
          <Plus className="w-8 h-16 text-textOnBlue align-middle" />
        </button>
        <div className="flex gap-12">
          {/* <NavItem icon={Bell} path="/alarm" /> */}
          <NavItemProfile />
        </div>
      </div>
    </div>
  );
}
