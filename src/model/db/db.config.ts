import * as dotenv from 'dotenv';
dotenv.config();

import { IDatabaseConfig, IDatabaseConfigAttributes } from '../dbInterface/dbConfig.interface';
import { DEVELOPMENT, PRODUCTION, TEST } from '../../constants'
 
const port: number= parseInt(process.env.DB_PORT, 10)
const user: string = process.env.DB_USER
const host: string = process.env.DB_HOST
const password: string = process.env.DB_PASSWORD

export const databaseConfig: IDatabaseConfig = {
  development: {
    user,
    password,
    database: process.env.DB_NAME_DEVELOPMENT,
    host,
    port: 5433
  },
  test: {
    user,
    password,
    database: process.env.DB_NAME_TEST,
    host,
    port,
  },
  production: {
    user,
    password,
    database: process.env.DB_NAME_PRODUCTION,
    host,
    port,
  },
};

export default function databaseConfigObject(): IDatabaseConfigAttributes{
  switch(process.env.NODE_ENV) {
    case DEVELOPMENT:
      return databaseConfig.development
    case PRODUCTION:
      return databaseConfig.production
    default: 
      console.log(process.env.NODE_ENV, 'value for NOVE_ENV')
      return databaseConfig.test
  } 
}