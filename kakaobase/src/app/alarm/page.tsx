import AlarmList from '@/features/alarm/ui/AlarmList';
import Header from '@/widgets/header/Header';
import NavBar from '@/widgets/navbar/NavBar';

export default function Page() {
  return (
    <div className="flex flex-col h-screen w-full scroll-none">
      <Header label="알림 목록" />
      <div
        className="flex-grow flex flex-col h-screen justify-center items-center p-6 w-full overflow-y-auto"
        data-scroll-area
      >
        알림 기능은 현재 준비 중입니다.
      </div>

      <NavBar />
    </div>
  );
}
