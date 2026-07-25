export default () => ({
  app: {
    globalPrefix: process.env.GLOBAL_PREFIX ?? 'api',
    apiVer: process.env.API_VERSION ?? 'v1',
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: parseInt(process.env.PORT ?? '3000', 10),
  },
  database: {
    url: process.env.DATABASE_URL,
  },
  redis: {
    url: process.env.REDIS_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    accessExpiresMs: parseInt(process.env.JWT_ACCESS_EXPIRES_MS ?? '900000', 10),
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresMs: parseInt(process.env.JWT_REFRESH_EXPIRES_MS ?? '604800000', 10),
  },
});
