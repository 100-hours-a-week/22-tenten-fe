import { AlarmEvent } from "./AlarmEvent";

export interface AlarmResponse {
    event: AlarmEvent;
    data: any;
}