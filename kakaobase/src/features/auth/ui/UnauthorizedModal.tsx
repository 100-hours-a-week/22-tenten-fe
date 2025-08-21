import RoutingButton from '@/shared/ui/button/RoutingButton';

export default function UnauthorizedModal() {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="m-6">
        <div className="flex flex-col gap-6 bg-containerColor px-10 py-6 md:px-6 rounded-xl animate-slide-in">
          <div className="flex text-center justify-center">
            로그인이 필요합니다.
            <br />
            다시 로그인 해주세요.
          </div>
          <div className="flex flex-col items-center md:flex-row gap-4">
            <RoutingButton path="/login" text="로그인 하러 가기" />
            <RoutingButton path="/" text="메인 페이지로 가기" />
          </div>
        </div>
      </div>
    </div>
  );
}
