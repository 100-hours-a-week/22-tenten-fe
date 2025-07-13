'use client';

import { useState, useEffect } from 'react';
import SubmitButton from '../../shared/ui/button/SubmitButton';
import { useUserStore } from '@/entities/users/stores/userStore';
import useRoutings from '@/shared/hooks/useRoutings';

export default function RequireLoginModal() {
  const [hydrated, setHydrated] = useState(false);
  const { userId } = useUserStore();
  const { goLogin } = useRoutings();

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated || userId !== 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-textOpacity50">
      <div className="flex items-center justify-center h-screen">
        <div className="hidden lg:flex flex-col w-[48%]"></div>
        <div className="flex justify-center max-w-[480px] w-full mx-auto lg:ml-12">
          <div className="flex gap-4 flex-col justify-center items-center px-6 py-8 animate-slide-in rounded-lg shadow-md bg-containerColor">
            <div>
              V2가 업데이트 되었습니다.
              <br />
              로그인해 주시길 바랍니다.
            </div>
            <SubmitButton text="로그인 하러 가기" onClick={goLogin} />
          </div>
        </div>
      </div>
    </div>
  );
}
