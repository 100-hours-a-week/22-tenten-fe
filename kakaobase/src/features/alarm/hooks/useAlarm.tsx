import { useEffect } from 'react';
import { connectStomp, disconnectStomp, sendChatCommand } from '../lib/socket';
import { IMessage } from '@stomp/stompjs';
import { useAlarmStore } from '../stores/alarmStore';
import { useToast } from '@/shared/hooks/ToastContext';
import { useChatStore } from '@/features/chat/stores/chatStore';
import { queryClient } from '@/shared/api/queryClient';
import { chatQueries } from '@/features/chat/api/chatQueries';

export default function useAlarm() {
  const { setAlarmInfo } = useAlarmStore();
  const { setChatState } = useChatStore();
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
          setAlarmInfo({ alarmList: parsed.data.notifications });
          setAlarmInfo({ cnt: parsed.data.unread_count });
          break;
        case 'notification.remove.ack':
          setAlarmInfo((prev) => {
            const removed = prev.alarmList.find(
              (n) => n.data.id === parsed.data.id
            );
            const isUnread = removed && !removed.data.is_read;
            return {
              cnt: isUnread ? Math.max(0, prev.cnt - 1) : prev.cnt,
            };
          });
          break;
        case 'notification.read.ack':
          setAlarmInfo((prev) => ({
            alarmList: prev.alarmList.map((n) =>
              n.data.id === parsed.data.id
                ? {
                    ...n,
                    data: {
                      ...n.data,
                      is_read: true,
                    },
                  }
                : n
            ),
            cnt: Math.max(0, prev.cnt - 1),
          }));
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

          setAlarmInfo((prev) => ({
            alarmList: [newAlarm, ...prev.alarmList],
            cnt: prev.cnt + 1,
          }));
          break;
        case 'chat.loading':
          setChatState({ isLoading: true });
        case 'chat.stream.start':
          setChatState({
            isLoading: false,
            isStreaming: true,
            streamingId: parsed.data.data.stream_id,
          });
        case 'chat.stream':
          setChatState((prev) => ({
            streamingChat: prev.streamingChat + parsed.data.data.content,
          }));
        case 'chat.stream.end':
          setChatState({ isStreaming: false, streamingChat: '' });
          queryClient.invalidateQueries({ queryKey: chatQueries.all() });
          sendChatCommand('chat.stream.end.ack', {
            chat_id: parsed.data.data.chat_id,
            message: '스트리밍 수신 성공',
            timestamp: new Date().toISOString().split('.')[0],
          });
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
