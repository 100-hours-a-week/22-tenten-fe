// src/hooks/useNotification.ts
import { useEffect, useState } from 'react';
import { connectStomp, disconnectStomp } from '../lib/socket';
import { IMessage } from '@stomp/stompjs';
import { AlarmEvent } from '../types/AlarmEvent';

export interface NotificationData {
  event: AlarmEvent;
  data: any;
}

export default function useAlarm() {
  const [alarmList, setAlarmList] = useState<NotificationData[]>([]);

  useEffect(() => {
    connectStomp((msg: IMessage) => {
      const parsed: NotificationData = JSON.parse(msg.body);

      switch (parsed.event) {
        case 'notification.fetch':
          setAlarmList(parsed.data);
          break;
        case 'notification.remove.ack':
          setAlarmList((prev) =>
            prev.filter((n) => n.data.id !== parsed.data.id)
          );
          break;
        default:
          setAlarmList((prev) => [parsed, ...prev]);
          break;
      }
    });

    // return () => {
    //   disconnectStomp();
    // };
  }, []);

  return { alarmList };
}
