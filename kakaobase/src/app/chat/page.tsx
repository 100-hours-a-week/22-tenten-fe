import ChatList from '@/features/chat/ui/ChatList';
import MessageInput from '@/features/chat/ui/MessageInput';
import Header from '@/widgets/header/Header';

export default function Page() {
  return (
    <div className="flex flex-col h-screen scroll-none">
      <Header label="로로 CHAT" />
      <div className="overflow-y-auto flex flex-col h-screen" data-scroll-area>
        <ChatList />
      </div>
      <MessageInput />
    </div>
  );
}
