import Database from '../db'
import { IDatabaseConfigAttributes } from '../dbInterface/dbConfig.interface'
import { ISelectQuery, IFindAll, ICreateTable, IInsertAll } from '../dbInterface/query.interface';

export default class DataAccess extends Database{
  private _values: Array<any[]> = [[]]
  constructor(public config: IDatabaseConfigAttributes){
    super(config)
  }

  async createTable (queryString: string): Promise<ICreateTable> {
    const {status, query, tableName} = this.structureQuery(queryString);
    try{
      if(!status){
        throw 'Query could not be set.';
      }
      const res = await this.pool.query(query);
      this.logger.info(query);
      this.logger.info(`Successfully created table ${tableName}.`);
      return {status: true, name : tableName};
    }catch(e) {
      this.logger.error('Table creation Failed.');
      this.logger.error(e);
      return {status: false, name : tableName};
    }
  }

  get values () {
    return this._values;
  }

  set values (val: Array<any>) {
    this._values = val;
  }

  structureQuery(query: string): {status: boolean, query: string, tableName: string} {
    try{
      query = query.trim();
      const queryArray: string[] = query.split(' ');
      let tableNameIndex : number;
      let index : number;
      if(queryArray.includes('EXISTS')){
        index = queryArray.findIndex((item) => item == 'EXISTS');
      }else{
        index  = queryArray.findIndex((item) => item == 'TABLE');
      }
      tableNameIndex = index + 1;
      const refTabName: string = queryArray[tableNameIndex];
      queryArray[tableNameIndex] = `${refTabName.charAt(0).toUpperCase()}${refTabName.slice(1)}`;
      query = queryArray.join(' ');
      return {status: true, query, tableName: queryArray[tableNameIndex]};
    }catch(e){
      this.logger.error(`Query could not be set`);
      return { status: false, query, tableName: 'unknown' };
    }
  }

  async find(queryObj: ISelectQuery ): Promise<any> {
    const { name } = queryObj;
    try{
      const res = await this.pool.query(queryObj);
      this.logger.info(`Successfully ran query with name - ${name}.`);
      return res.rows;
    }catch(e){
      this.logger.info(`Failed query - ${name} : ${e}`);
    }
  }

  async findAll(queryObj: IFindAll ): Promise<any> {
    const { name } = queryObj;
    try{
      const res = await this.pool.query(queryObj);
      this.logger.info(`Successfully ran query with name - ${name}.`);
      return res.rows;
    }catch(e){
      this.logger.info(`Failed query - ${name} : ${e}`);
    }
  }

  setInsertAllQuery (arrayOfValues: Array<any[]>, tableName: string, columnList: string[]): string {
    let query: string ;
    query = `INSERT INTO ${tableName} (${columnList.join()}) VALUES `;
    let num = 0;
    arrayOfValues.slice().forEach((item, i) => {
      item.forEach((val, index) => {
        num++;
        if(index == 0){
          query += `($${num}, `
        }else if(index == item.length - 1 ){
          query += `$${num})`;
          if(i != arrayOfValues.length - 1){
            query += `, `
          }
        }else{
          query += `$${num}, `;
        }
      })        
    })  
    query += ' ON CONFLICT (id) DO NOTHING RETURNING id' ;
    return query;
  }

  async insertAll(arrayOfValues: Array<any[]>, tableName: string, columnList: string[]): Promise<IInsertAll> {
    try{
      let query = this.setInsertAllQuery(arrayOfValues, tableName, columnList);
      let values: any[] = [];
      arrayOfValues.forEach((item, i) => {
        values = [...values, ...item];
      })
      const queryObj = {
        text: query,
        values
      };
      const res = await this.pool.query(queryObj) ;
      this.logger.info(`Successfully inserted data into ${tableName} table.`);
      return {status: true, res};
    }catch(e){
      this.logger.error(`Insert to ${tableName} table failed: ${e}.`);
      return {status: false};
    }
  }

  async dropTables (tableName: string[]): Promise<{status: boolean, message: string}> {
    const tables =  tableName.length > 1 ? 'Tables' : 'Table';
    try{
      const sql: string = `DROP TABLE IF EXISTS ${tableName.join()}`;
      const res = await this.pool.query(sql);
      this.logger.info(
        `${tables} - ${tableName.join()} have been dropped.`
      );
      return { 
        status: true, 
        message: `${tables} dropped`
      }
    }catch(e) {
      this.logger.info(
        `${tables} - ${tableName.join()} could not dropped.`
      );
      return { 
        status: false, 
        message: `${tables} could not dropped`
      }
    }
  }

  async tableCreationAndInsert(val: Array<any[]>, query: string, columnList: string[]): Promise<any> {
    this.values = val;
    const response: ICreateTable = await this.createTable(query)
    const { status, name } = response;
    this.logger.info(`status for table creation for  - ${name} is ${status}`);
    if(status){
      const insertRes: IInsertAll = await this.insertAll(this.values, name, columnList);
      return insertRes;
    }
  }

}



 