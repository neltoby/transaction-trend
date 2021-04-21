export interface ITransaction {
  amount: number;
  icon_url: string;
  transactions: number;
  id?:number;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  created_at?: string;
}

export interface ITransactionUser extends ITransaction {
  id:number;
  first_name: string;
  last_name: string;
  avatar: string;
  created_at: string;
}

export interface ITransactionArray {
  amount: number,
  icon_url: string[],
  transactions: number
}

export interface IUsers {
  id:number;
  first_name: string;
  last_name: string;
  avatar: string;
  created_at: string;
}

export interface IOtherUsers extends IUsers{
  transactions: number
}
