export type AppConfig = {
  app: {
    globalPrefix: string;
    apiVersion: string;
    nodeEnv: string;
    port: number;
    corsOrigin: string;
  };
  database: {
    url: string;
  };
  redis: {
    url: string;
  };
  jwt: {
    secret: string;
    accessExpiresMs: number;
    refreshSecret: string;
    refreshExpiresMs: number;
  };
  s3: {
    endpoint: string;
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
    bucket: string;
    publicUrl: string;
    forcePathStyle: boolean;
  };
};

const NOTFOUND_KEY = 'KEY_NOT_FOUND';

export default (): AppConfig => ({
  app: {
    globalPrefix: process.env.GLOBAL_PREFIX ?? 'api',
    apiVersion: process.env.API_VERSION ?? 'v1',
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: parseInt(process.env.PORT ?? '3000', 10),
    corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:3001',
  },
  database: {
    url: process.env.DATABASE_URL ?? NOTFOUND_KEY,
  },
  redis: {
    url: process.env.REDIS_URL ?? NOTFOUND_KEY,
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? NOTFOUND_KEY,
    accessExpiresMs: parseInt(process.env.JWT_ACCESS_EXPIRES_MS ?? '900000', 10),
    refreshSecret: process.env.JWT_REFRESH_SECRET ?? NOTFOUND_KEY,
    refreshExpiresMs: parseInt(process.env.JWT_REFRESH_EXPIRES_MS ?? '604800000', 10),
  },
  s3: {
    endpoint: process.env.S3_ENDPOINT ?? NOTFOUND_KEY,
    region: process.env.S3_REGION ?? 'us-east-1',
    accessKeyId: process.env.S3_ACCESS_KEY_ID ?? NOTFOUND_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? NOTFOUND_KEY,
    bucket: process.env.S3_BUCKET ?? NOTFOUND_KEY,
    publicUrl: process.env.S3_PUBLIC_URL ?? NOTFOUND_KEY,
    forcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true',
  },
});
