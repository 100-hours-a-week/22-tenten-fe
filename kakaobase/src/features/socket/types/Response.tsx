export interface AckResponse {
  id: number;
  message: string;
  timestamp: string;
}

export interface NackResponse {
  id: number;
  error: string;
  message: string;
  timestamp: string;
}
