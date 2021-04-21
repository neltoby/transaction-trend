import DataAccess from '../model/dataAccess';
import { IUsecaseParameter } from '.';
import { queries } from '../model/dataAccess';
import Transaction, { ITransactionUser, IUsers } from '../user-expense-trend/transaction';
import UserTrend from '../user-expense-trend/user/user-with-transaction';
import User from '../user-expense-trend/user/user-service'

export default function makeUserCase ({ dataAccess }: {dataAccess: DataAccess}) {
  return async function userCase (req: IUsecaseParameter): Promise<any> {
    try{
      if(req.constructor !== Object){
        throw {
            statusCode: 400,
            message: 'supplied data must be of type object',
            status: 'Bad request',
        }
      }
      const { id, source } = req;
      const { findUser, findUserDetails } = queries;
      const rows: any[] = await dataAccess.find({ 
        text: findUser, 
        values: [id, id, id], 
        name: 'user_trend' 
      });
      if(rows.length){
        const user: ITransactionUser = rows[0];
        const { 
          id, 
          first_name, 
          last_name, 
          avatar, 
          created_at 
        } = user;
        const res = rows.map((item, i) => {
          if(typeof item.transactions == 'string') 
          item.transactions = parseInt(item.transactions, 10)
          return item
        })
        const transaction = new Transaction(res);
        const userTrend = new UserTrend(
          first_name, 
          last_name, 
          id, 
          avatar, 
          created_at, 
          transaction
        );

        return {
          status: true,
          message: 'Transactions exist',
          data: {
            name: userTrend.name,
            id: userTrend.id,
            avatar: userTrend.avatar,
            created_at: userTrend.created_at,
            transaction: {
              amount: userTrend.transactions.amount,
              icon_urls: userTrend.transactions.icon_url,
              transactions: userTrend.transactions.transactions
            },
          },
          transaction_count: transaction.transactionCount,
          source
        }
      }else{
        const res: IUsers[] = await dataAccess.find({
          text: findUserDetails,
          values: [req.id],
          name: 'user-info'
        })
        if(res.length){
          const {
            id,
            first_name,
            last_name,
            avatar,
            created_at
          } = res[0]
          const user = new User(
            first_name, 
            last_name, 
            id, avatar, 
            created_at
          );
          return {
            status: false,
            message: 'Transactions not found',
            data: {
              name: user.name,
              id: user.id,
              avatar: user.avatar,
              created_at: user.created_at
            },
            transaction_count: 0,
            source,
          }
        }else{
          return {
            status: false,
            message: 'User not found',
            source,
          }
        }
      }
    }catch(e){
        throw {
          message: e.message ? e.message : 'Server error',
          statusCode: e.statusCode ? e.statusCode : 500
        }
    }
  }
}