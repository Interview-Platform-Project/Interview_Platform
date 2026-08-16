const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '/api/v1';

interface ApiRequestOptions extends RequestInit {
  url: string;
  /** Do not attempt /auth/refresh on 401 (login/register/session probe). */
  skipRefresh?: boolean;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public body?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

function formatErrorMessage(payload: unknown, fallback: string): string {
  if (!payload || typeof payload !== 'object') return fallback;

  const message = (payload as { message?: string | string[] }).message;
  if (Array.isArray(message)) return message.join(', ');
  if (typeof message === 'string' && message.length > 0) return message;

  return fallback;
}

export const apiRequest = async <T>(
  options: ApiRequestOptions,
  isRetry = false,
): Promise<T | null> => {
  const { url, skipRefresh, ...rest } = options;

  try {
    const response = await fetch(`${API_URL}${url}`, { ...rest, credentials: 'include' });

    if (response.status === 401 && !skipRefresh && !isRetry && url !== '/auth/refresh') {
      const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!refreshResponse.ok) {
        let refreshBody: unknown;
        try {
          refreshBody = await refreshResponse.json();
        } catch {
          refreshBody = undefined;
        }
        throw new ApiError(
          formatErrorMessage(refreshBody, `HTTP error! status: ${refreshResponse.status}`),
          refreshResponse.status,
          refreshBody,
        );
      }

      return apiRequest<T>({ url, skipRefresh, ...rest }, true);
    }

    if (!response.ok) {
      let body: unknown;
      try {
        body = await response.json();
      } catch {
        body = undefined;
      }

      throw new ApiError(
        formatErrorMessage(body, `HTTP error! status: ${response.status}`),
        response.status,
        body,
      );
    }

    if (response.status === 204) return null;

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError('Unexpected error', 500);
  }
};
