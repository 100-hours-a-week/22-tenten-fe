import { ChatClientEvent } from '@/features/chat/types/ChatEvent';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient: Client | null = null;

// 새 STOMP+SockJS 클라이언트 생성 및 연결
function initClient(onMessage: (msg: IMessage) => void) {
  // 기존 연결 정리
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
  }

  const client = new Client({
    webSocketFactory: () => new SockJS(`${process.env.NEXT_PUBLIC_API_URL}/ws`),
    reconnectDelay: 1000, // 1초마다 자동 재연결 시도
    onConnect: () => {
      // 구독 등록
      client.subscribe('/user/queue/notification', onMessage);
      client.subscribe('/user/queue/chatbot', onMessage);
      client.subscribe('/user/queue/error', () => {
        /* … */
      });
    },
    onWebSocketClose: () => {
      console.warn('[STOMP] 소켓 닫힘 — 강제 재연결');
      // 토큰 재발급 없이 바로 재연결
      initClient(onMessage);
    },
    onStompError: (frame) => {
      console.error('[STOMP] 오류:', frame.headers['message']);
    },
  });

  stompClient = client;
  client.activate();
}

export const connectStomp = (onMessage: (msg: IMessage) => void) => {
  // active 여부와 상관없이 initClient 호출 → 무조건 새 연결
  initClient(onMessage);
};

export const disconnectStomp = () => {
  stompClient?.deactivate();
  stompClient = null;
};

export const sendNotificationCommand = (event: string, data: any) => {
  if (!stompClient?.connected) return;
  stompClient.publish({
    destination: `/pub/${event}`,
    body: JSON.stringify({ event, data }),
  });
};

export const sendChatCommand = (event: ChatClientEvent, data: any) => {
  if (!stompClient?.connected) return;
  stompClient.publish({
    destination: `/pub/${event}`,
    body: JSON.stringify({ event, data }),
  });
};
