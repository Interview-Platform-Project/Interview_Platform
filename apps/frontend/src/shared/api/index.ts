const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ApiRequestOptions extends RequestInit {
  url: string;
  _isRetry?: boolean;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const apiRequest = async <T>(
  options: ApiRequestOptions,
  _isRetry = false,
): Promise<T | null> => {
  const { url, ...rest } = options;

  try {
    const response = await fetch(`${API_URL}${url}`, { ...rest, credentials: 'include' });

    if (response.status === 401 && !_isRetry && url !== '/auth/refresh') {
      _isRetry = true;

      const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!refreshResponse.ok) {
        throw new ApiError(`HTTP error! status: ${refreshResponse.status}`, refreshResponse.status);
      }

      return apiRequest<T>({ url, ...rest }, true);
    }

    if (!response.ok) {
      throw new ApiError(`HTTP error! status: ${response.status}`, response.status);
    }

    if (response.status === 204) return null;

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError('Unexpected error', 500);
  }
};
