export default () => ({
  app: {
    globalPrefix: process.env.GLOBAL_PREFIX ?? 'api',
    apiVer: process.env.API_VERSION?? "v1",
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: parseInt(process.env.PORT ?? '3000', 10),
  },
  database: {
    url: process.env.DATABASE_URL,
  },
  redis: {
    url: process.env.REDIS_URL,
  },

});
