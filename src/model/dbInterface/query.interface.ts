export interface IQuery {
  text: string;
  values?: Array<any>;
}
export interface ISelectQuery extends IQuery {
  values: Array<any>;
  name: string;
}
export interface ICreateTable {
  status: boolean;
  name: string;
}
export interface IInsertAll {
  status: boolean;
  res?: any;
}