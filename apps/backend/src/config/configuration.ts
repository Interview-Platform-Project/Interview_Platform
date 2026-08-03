export type AppConfig = {
  app: {
    globalPrefix: string;
    apiVer: string;
    nodeEnv: string;
    port: number;
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
};

const NOTFOUND_KEY: string = 'KEY_NOT_FOUND';
export default (): AppConfig => ({
  app: {
    globalPrefix: process.env.GLOBAL_PREFIX ?? 'api',
    apiVer: process.env.API_VERSION ?? 'v1',
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: parseInt(process.env.PORT ?? '3000', 10),
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
});
