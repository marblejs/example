export enum Env {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
}

export const Config = {
  env: process.env.NODE_ENV || Env.DEVELOPMENT,
  server: {
    host: process.env.HOST || '127.0.0.1',
    port: Number(process.env.PORT) || 1337,
  },
  db: {
    urlMain: 'mongodb://localhost:27017/marble-example',
    urlTest: 'mongodb://localhost:27017/marble-example-test',
  },
  logger: {
    level: process.env.LOG_LEVEL || 'dev',
    enabled: Boolean(process.env.LOG_ENABLED) || false,
  },
};
