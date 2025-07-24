import Image from 'next/image';

export default function HeaderMain() {
  return (
    <div className="flex sticky z-30 py-2 gap-2 px-6 items-center w-full max-w-[480px] border-textOpacity50 border-b-[1px] top-0 mx-auto lg:self-start bg-bgColor text-textColor shadow-sm">
      <div className="w-10 h-10 relative m-2">
        <Image
          src="/logo_square.png"
          alt="로고"
          sizes="480px"
          className="object-cover"
          fill
          priority
        />
      </div>
      <div className="text-textColor flex flex-col">
        <div className="text-lg font-bold">KakaoBase</div>
        <div className="text-[0.5rem]">for Kakaotech Bootcamp Students</div>
      </div>
    </div>
  );
}
