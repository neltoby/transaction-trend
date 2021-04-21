import DataAccess from '../model/dataAccess';
import { databaseConfigObject } from '../model/db'
export const dataAccess: DataAccess = new DataAccess(databaseConfigObject());