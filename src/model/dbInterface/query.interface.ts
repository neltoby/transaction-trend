export interface IQuery {
  text: string;
  values?: Array<any>;
}
export interface IFindAll {
  text: string;
  name: string;
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