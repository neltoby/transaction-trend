import User from '../user-service'
import { ITransactionArray  } from '../../transaction'

export default class UserTrend extends User {
   
  constructor(
    first_name:string,
    last_name: string,
    _id: number,
    _avatar: string,
    _created_at: string,
    private _transactions:ITransactionArray ,
    ){
    super(first_name, last_name, _id,_avatar,_created_at);
  }
  
  get transactions (){
    return this._transactions
  }

  set transactions (val: ITransactionArray ){
    this._transactions = val
  }

}