import { useToast } from '@/app/ToastContext';
import axios from 'axios';
import { AxiosError, AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

//로그인 안 돼있을 경우 - 인터셉터
let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (error: unknown) => {
  failedQueue.forEach(({ resolve, reject }) => {
    error ? reject(error) : resolve();
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (
    error: AxiosError & { config?: AxiosRequestConfig & { _retry?: boolean } }
  ) => {
    const origReq = error.config!;
    const { showToast } = useToast();
    if (error.response?.status === 401 && !origReq._retry) {
      if (isRefreshing) {
        //토큰 재발급 중
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(origReq));
      }

      origReq._retry = true;
      isRefreshing = true;

      try {
        await api.post('/auth/tokens/refresh');

        processQueue(null);
        return api(origReq); //기존 api 요청 재시도
      } catch (refreshError) {
        processQueue(refreshError);
        showToast('로그인이 필요합니다. 😭');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // 그 외 에러는 그대로 reject
    return Promise.reject(error);
  }
);

export default api;
