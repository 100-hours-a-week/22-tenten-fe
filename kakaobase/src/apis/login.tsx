import api from './api';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  data: {
    access_token: string;
    class_name: string;
    nickname: string;
    image_url: string;
    member_id: string;
  };
}

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const response = await api.post('/auth/tokens', payload);
  return response.data;
}

export async function refreshToken() {
  try {
    const response = await api.post('auth/tokens/refresh');
    return response.data;
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}
