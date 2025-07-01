import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient: Client | null = null;
const reconnectTime = 5000; //5초

export const connectStomp = (onMessage: (msg: IMessage) => void) => {
  const socket = new SockJS(`${process.env.NEXT_PUBLIC_API_URL}ws`);

  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: reconnectTime,
    debug: (str) => console.log('stomp debug :', str),
    onConnect: () => {
      console.log('서버와 stomp 연결 완료');

      stompClient?.subscribe(
        '/user/queue/notification',
        (message: IMessage) => {
          try {
            const parsed = JSON.parse(message.body);
            console.log('알림 이벤트:', parsed.event);
            onMessage(parsed);
          } catch (err) {
            console.error('메시지 파싱 오류:', err);
          }
        }
      );
      stompClient?.subscribe('/user/queue/error', (message: IMessage) => {
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

// data 형식
// data {
//   Long id;
//   LocalDateTime timestamp;
// }
//pub = publish
