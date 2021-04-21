import DataAccess, { queries } from '../model/dataAccess';
import { dataAccess } from '.';
import fileReader from './filereader';
export default async function connection () {
  const { 
    createUserTable, 
    createTransactionTable 
  } = queries;
  let columnList = [
    'id',
    'first_name',
    'last_name',
    'avatar',
    'created_at'
  ];
  const callback: any = fileReader(
    'users.csv', 
    columnList, 
    createUserTable
  );
  await callback(dataAccess.tableCreationAndInsert, dataAccess);
  columnList = [
    'id',
    'user_id',
    'amount',
    'type',
    'date_time', 
    'category', 
    'icon_url'
  ];
  const callback1: any = fileReader(
    'transactions.csv', 
    columnList, 
    createTransactionTable
  );
  await callback1(dataAccess.tableCreationAndInsert, dataAccess);  
}