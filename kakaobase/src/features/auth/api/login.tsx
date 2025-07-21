import { Course } from '@/shared/types/Course';
import api from '@/shared/api/api';
import { AxiosError } from 'axios';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  data: {
    class_name: Course;
    nickname: string;
    member_id: string;
    image_url: string;
  };
}

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await api.post('/auth/tokens', payload);
    return response.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) throw e.response?.data;
    throw e;
  }
}
