import * as fs from 'fs';
import { parseStream } from 'fast-csv';

import { IInsertAll } from '../model/dbInterface/query.interface'

export default function fileReader(path: string, columnList: string[], query: string): any {
  return async function (callback: (val: Array<any[]>, query: string, columnList: string[]) => IInsertAll, obj: any) {
  let val: Array<any[]> = [];
  const stream: any = fs.createReadStream(path);
  await parseStream(stream, { skipRows: 1 })
    .on('error', (error: any) => console.error(error))
    .on('data', (row: any[]) => {
      const num = parseInt(row[0], 10);
      row[0] = num;
      val = [...val, row];
    })
    .on('end', async (rowCount: number) => {
      callback = callback.bind(obj);
      await callback(val, query, columnList);
    });
  }
}