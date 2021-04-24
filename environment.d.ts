import { DEVELOPMENT, PRODUCTION, TEST } from './src/constants'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_USER: string,
      DB_PASSWORD: string,
      DB_NAME_DEVELOPMENT: string,
      DB_NAME_TEST: string,
      DB_HOST:string,
      DB_PORT:string,
      DATABASE_URL: string,
      API_ROOT: string,
      REDIS_HOSTNAME: string,
      REDIS_PORT: string,
      REDIS_PASSWORD: string,
      NODE_ENV: DEVELOPMENT | PRODUCTION | TEST;
    }
  }
}

export {}