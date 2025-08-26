import { ChatClientEvent } from '@/features/chat/types/ChatEvent';
import type { Client, IMessage } from '@stomp/stompjs';

let stompClient: Client | null = null;
let _ClientCtor: typeof import('@stomp/stompjs').Client | null = null;
let _SockJSCtor: any | null = null;

async function ensureDepsLoaded() {
  if (!_ClientCtor) {
    const di = await import('@stomp/stompjs');
    _ClientCtor = di.Client;
  }
  if (!_SockJSCtor) {
    const sock = await import('sockjs-client');
    _SockJSCtor = (sock as any).default ?? sock;
  }
}

let refreshing = false;
async function refreshOnFinished() {
  if (refreshing) return;
  refreshing = true;
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/tokens/refresh`, {
      method: 'POST',
      credentials: 'include',
    });
  } catch {
    window.location.href = '/unauthorized';
  } finally {
    refreshing = false;
  }
}

function initClient(onMessage: (msg: IMessage) => void) {
  if (!_ClientCtor || !_SockJSCtor) return;

  if (stompClient && stompClient.active) return;
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
  }

  const client = new _ClientCtor!({
    webSocketFactory: () =>
      new _SockJSCtor!(`${process.env.NEXT_PUBLIC_API_URL}/ws`, null, {
        transports: ['websocket'],
      }),
    reconnectDelay: 1000,
    onConnect: () => {
      client.subscribe('/user/queue/notification', onMessage);
      client.subscribe('/user/queue/chatbot', onMessage);
      client.subscribe('/user/queue/error', () => {});
    },
    onWebSocketClose: () => {
      refreshOnFinished();
    },
  });

  stompClient = client;
  client.activate();
}

export const connectStomp = (onMessage: (msg: IMessage) => void) => {
  ensureDepsLoaded().then(() => initClient(onMessage));
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
