export interface IDatabaseConfigAttributes {
  user?: string;
  password?: string;
  database?: string;
  host?: string;
  port?: number;
  connectionString?: string;
  ssl?: any;
  types?: any;
  statement_timeout?: number;
  query_timeout?: number;
  connectionTimeoutMillis?: number;
  idle_in_transaction_session_timeout?: number;
}

export interface IDatabaseProductionConfigAttributes {
  urlDatabase: any;
}

export interface IDatabaseConfig {
  development: IDatabaseConfigAttributes;
  test: IDatabaseConfigAttributes;
  production: IDatabaseConfigAttributes;
}