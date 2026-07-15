export type HealthCheckStatus = 'up' | 'down';

export type ServiceStatus = 'ok' | 'error';

export interface HealthResponse {
  status: ServiceStatus;
  timestamp: string;
  uptime: number;
  checks: {
    database: HealthCheckStatus;
    redis: HealthCheckStatus;
  };
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string | string[];
  error: string;
  timestamp: string;
  path: string;
}

export interface UserResponse {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}
