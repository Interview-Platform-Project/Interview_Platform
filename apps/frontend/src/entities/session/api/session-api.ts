import { ApiError, apiRequest } from '@/shared/api';
import type { AuthResponse } from '../model/types';

export async function fetchSession(): Promise<AuthResponse | null> {
  try {
    return await apiRequest<AuthResponse>({
      url: '/auth/me',
      method: 'GET',
    });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return null;
    }
    throw error;
  }
}

export async function loginRequest(body: { email: string; password: string }) {
  return apiRequest<AuthResponse>({
    url: '/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    skipRefresh: true,
  });
}

export async function registerRequest(body: { name: string; email: string; password: string }) {
  return apiRequest<AuthResponse>({
    url: '/auth/register',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    skipRefresh: true,
  });
}

export async function logoutRequest() {
  return apiRequest({
    url: '/auth/logout',
    method: 'POST',
    skipRefresh: true,
  });
}
