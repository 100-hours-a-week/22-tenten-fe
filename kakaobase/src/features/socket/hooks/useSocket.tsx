import { useEffect } from 'react';
import { connectStomp, disconnectStomp, sendChatCommand } from '../lib/socket';
import { IMessage } from '@stomp/stompjs';
import { useToast } from '@/shared/hooks/ToastContext';
import { queryClient } from '@/shared/api/queryClient';
import { chatQueries } from '@/features/chat/api/chatQueries';
import { useChatStore } from '@/features/chat/stores/chatStore';
import { alarmQueries } from '@/features/alarm/api/alarmQueries';

export default function useSocket() {
  const { startLoading, startStreaming, setStreamingChat, clear } =
    useChatStore();
  const { showToast } = useToast();

  useEffect(() => {
    connectStomp((msg: IMessage) => {
      const parsed = JSON.parse(msg.body) as {
        type: string;
        event: string;
        data: any;
      };

      switch (parsed.event) {
        case 'notification.remove.ack':
        case 'notification.read.ack':
          queryClient.invalidateQueries({ queryKey: alarmQueries.all() });
          break;
        case 'comment.created':
        case 'recomment.created':
        case 'post.like.created':
        case 'comment.like.created':
        case 'recomment.like.created':
        case 'following.created':
          showToast('알림 도착! 🔔');
          queryClient.invalidateQueries({ queryKey: alarmQueries.all() });
          break;
        case 'chat.loading':
          startLoading();
          break;
        case 'chat.stream.start':
          startStreaming(parsed.data.stream_id);
          break;
        case 'chat.stream':
          setStreamingChat(parsed.data.content);
          break;
        case 'chat.stream.end':
          clear();
          queryClient.invalidateQueries({ queryKey: chatQueries.all() });
          sendChatCommand('chat.stream.end.ack', {
            chat_id: parsed.data.chat_id,
            message: '스트리밍 수신 성공',
            timestamp: new Date().toISOString().split('.')[0],
          });
          break;
        case 'chat.stream.error':
          clear();
          sendChatCommand('chat.stream.end.nack', {
            chat_id: null,
            message:
              '백엔드에서 에러 관련 이벤트를 전송해서 nack을 보내주는 상황입니다',
            timestamp: new Date().toISOString().split('.')[0],
          });
          showToast('문제 발생! 답변에 실패했습니다.😭');
          break;
        default:
          showToast('문제 발생! 잠시 후 다시 시도해 주세요. 😭');
          break;
      }
    });

    return () => {
      disconnectStomp();
    }; //메모리 누수 방지
  }, []);

  return {};
}
