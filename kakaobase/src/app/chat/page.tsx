import ChatList from '@/features/chat/ui/ChatList';
import Header from '@/widgets/header/Header';
import NavBar from '@/widgets/navbar/NavBar';
import ChatInput from '@/features/chat/ui/ChatInput';

export default function Page() {
  return (
    <div className="flex flex-col h-screen scroll-none">
      <div className="flex flex-col h-screen pb-16">
        <Header label="로로 CHAT" />
        <ChatList />
        <ChatInput />
      </div>
      <NavBar />
    </div>
  );
}
