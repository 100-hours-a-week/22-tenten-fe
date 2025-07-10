import ChatList from '@/features/chat/ui/ChatList';
import MessageInput from '@/features/chat/ui/MessageInput';
import Header from '@/widgets/header/Header';
import NavBar from '@/widgets/navbar/NavBar';

export default function Page() {
  return (
    <div className="flex flex-col h-screen scroll-none">
      <Header label="로로 CHAT" />
      <div
        className="flex-grow flex flex-col h-screen items-center w-full overflow-y-auto"
        data-scroll-area
      >
        <ChatList />
      </div>
      <MessageInput />
      <NavBar />
    </div>
  );
}
