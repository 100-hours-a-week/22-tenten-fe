import { ChatClientEvent } from '@/features/chat/types/ChatEvent';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient: Client | null = null;

function initClient(onMessage: (msg: IMessage) => void) {
  if (stompClient && stompClient.active) {
    return;
  }
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
  }

  const client = new Client({
    webSocketFactory: () =>
      new SockJS(`${process.env.NEXT_PUBLIC_API_URL}/ws`, null, {
        transports: ['websocket'],
      }),
    reconnectDelay: 1000,
    onConnect: () => {
      client.subscribe('/user/queue/notification', onMessage);
      client.subscribe('/user/queue/chatbot', onMessage);
      client.subscribe('/user/queue/error', () => {});
    },
    onWebSocketClose: () => {
      console.warn('[STOMP] 소켓 닫힘 — 강제 재연결');
      initClient(onMessage);
    },
    onStompError: (frame) => {
      console.error('[STOMP] 오류:', frame.headers.message);
    },
  });

  stompClient = client;
  client.activate();
}

export const connectStomp = (onMessage: (msg: IMessage) => void) => {
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
