import { useEffect } from 'react';
import { connectStomp, disconnectStomp, sendChatCommand } from '../lib/socket';
import { IMessage } from '@stomp/stompjs';
import { useAlarmStore } from '../../alarm/stores/alarmStore';
import { useToast } from '@/shared/hooks/ToastContext';
import { queryClient } from '@/shared/api/queryClient';
import { chatQueries } from '@/features/chat/api/chatQueries';
import { useChatStore } from '@/features/chat/stores/chatStore';

export default function useSocket() {
  const {
    setAlarmList,
    setCnt,
    removeAlarm,
    cntDecrement,
    cntIncrement,
    readAlarm,
    addAlarm,
  } = useAlarmStore();
  const {
    startLoading,
    startStreaming,
    setStreamingChat,
    stopStreaming,
    clear,
  } = useChatStore();
  const { showToast } = useToast();

  useEffect(() => {
    connectStomp((msg: IMessage) => {
      const parsed = JSON.parse(msg.body) as {
        type: string;
        event: string;
        data: any;
      };

      switch (parsed.event) {
        case 'notification.fetch':
          setAlarmList(parsed.data.notifications);
          setCnt(parsed.data.unread_count);
          break;
        case 'notification.remove.ack':
          removeAlarm(parsed.data);
          break;
        case 'notification.read.ack':
          readAlarm(parsed.data);
          cntDecrement();
          break;
        case 'comment.created':
        case 'recomment.created':
        case 'post.like.created':
        case 'comment.like.created':
        case 'recomment.like.created':
        case 'following.created':
          const newAlarm = {
            type: parsed.type,
            event: parsed.event,
            data: parsed.data,
          };

          addAlarm(newAlarm);
          cntIncrement();
          break;
        case 'chat.loading':
          startLoading();
          break;
        case 'chat.stream.start':
          startStreaming(parsed.data.data.stream_id);
          break;
        case 'chat.stream':
          setStreamingChat(parsed.data.data.content);
          break;
        case 'chat.stream.end':
          stopStreaming();
          sendChatCommand('chat.stream.end.ack', {
            chat_id: parsed.data.data.chat_id,
            message: '스트리밍 수신 성공',
            timestamp: new Date().toISOString().split('.')[0],
          });
          queryClient.invalidateQueries({ queryKey: chatQueries.all() });
          break;
        case 'chat.stream.error':
          clear();
          sendChatCommand('chat.stream.end.nack', {
            chat_id: null,
            message:
              '백엔드에서 에러 관련 이벤트를 전송해서 nack을 보내주는 상황입니다',
            timestamp: new Date().toISOString().split('.')[0],
          });
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
