import DataAccess, { queries } from '../model/dataAccess';
import { databaseConfigObject } from '../model/db'

export const databAccessInstance: DataAccess = new DataAccess(databaseConfigObject())