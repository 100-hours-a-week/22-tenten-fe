import { ChatPublishingEvent } from '@/features/chat/types/ChatPublishingEvent';
import api from '@/shared/api/api';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient: Client | null = null;
const reconnectTime = 100; //0.1초

async function tryRefreshAndReconnect(onMessage: (msg: IMessage) => void) {
  try {
    await api.post(`/auth/tokens/refresh`);
    console.log('[STOMP] 토큰 재발급 성공, 소켓 재연결 시도');
    if (onMessage) await connectStomp(onMessage);
    return true;
  } catch (err) {
    console.error('[STOMP] 토큰 재발급 실패', err);
    return false;
  }
}

export const connectStomp = async (onMessage: (msg: IMessage) => void) => {
  if (stompClient && stompClient.active) {
    console.warn('[STOMP] 이미 연결 중입니다.');
    return;
  }

  const socket = new SockJS(`${process.env.NEXT_PUBLIC_API_URL}/ws`);

  socket.onclose = async () => {
    console.warn('[SockJS onclose]');

    const shouldReconnect = await tryRefreshAndReconnect(onMessage);
    if (!shouldReconnect) {
      console.warn('토큰 재발급 실패. 소켓 재연결 불가');
    }
  };

  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: reconnectTime,
    onConnect: () => {
      if (!stompClient || !stompClient.connected) return;

      stompClient.subscribe('/user/queue/notification', (message: IMessage) => {
        try {
          const parsed = message;
          onMessage(parsed);
        } catch (err) {
          console.error('메시지 파싱 오류:', err);
        }
      });
      stompClient.subscribe('/user/queue/chatbot', (message: IMessage) => {
        try {
          const parsed = message;
          onMessage(parsed);
        } catch (err) {
          console.error('메시지 파싱 오류:', err);
        }
      });
      stompClient.subscribe('/user/queue/error', (message: IMessage) => {
        try {
          const parsed = JSON.parse(message.body);
          console.log('[알림 에러]', parsed.message || parsed.error);
        } catch (e) {
          console.error('에러 패킷 파싱 실패:', e);
        }
      });
    },
    onStompError: (frame) => {
      console.error('STOMP 오류:', frame.headers['message']);
    },
  });

  stompClient.activate();
};

export const disconnectStomp = () => {
  stompClient?.deactivate();
};

export const sendNotificationCommand = (event: string, data: any) => {
  if (!stompClient || !stompClient.connected) return;

  const payload = JSON.stringify({ event, data });
  const pubPath =
    event === 'notification.read'
      ? '/pub/notification.read' //알림 읽기
      : '/pub/notification.remove'; //알림 삭제

  stompClient.publish({
    destination: pubPath,
    body: payload,
  });
};

export const sendChatCommand = (event: ChatPublishingEvent, data: any) => {
  if (!stompClient || !stompClient.connected) return;

  const payload = JSON.stringify({ event, data });
  const pubPath = '/pub/chat';

  stompClient.publish({
    destination: pubPath,
    body: payload,
  });
};
