import DataAccess from '../model/dataAccess';
import { IUsecaseParameter } from '.';
import { queries } from '../model/dataAccess';
import { IOtherUsers, IUsers } from '../user-expense-trend/transaction';
import OtherUsers from '../user-expense-trend/user/other-users';
import User from '../user-expense-trend/user/user-service';

export default function makeOtherUserCase ({ dataAccess }: {dataAccess: DataAccess}) {
  return async function otherUserCase (req: IUsecaseParameter): Promise<any> {
    try{
      if(req.constructor !== Object){
        throw {
          statusCode: 400,
          message: 'supplied data must be of type object',
          status: 'Bad request',
        }
      }
      const { id, source } = req;
      const { findOtherUsers, findUserDetails } = queries;
      const userRow: IUsers[] = await dataAccess.find({
        text: findUserDetails,
          values: [id],
          name: 'user-info'
      })
      if(userRow.length){
        const userDetail: IUsers = userRow[0];
        const { 
          first_name,
          last_name,
          avatar,
          created_at,
          id
        } = userDetail
        const user = new User(
          first_name, 
          last_name, 
          id, 
          avatar, 
          created_at
        );
        const rows: IOtherUsers[] = await dataAccess.find({ 
          text: findOtherUsers, 
          values: [id, id, id], 
          name: 'other_user_trend',
        });
        if(rows.length){
          const arrOfOtherUsers = rows.map((item, i) => {
            const {
              first_name,
              last_name,
              avatar,
              created_at,
              id,
              transactions
            } = item;
            const others = new OtherUsers(
              first_name, 
              last_name, 
              id, 
              avatar, 
              created_at, 
              transactions
            );
            return {
              name: others.name, 
              id: others.id,
              avatar: others.avatar,
              created_at: others.created_at,
              transactions: others.transactions,
            }
          })
          return {
            status: true,
            message: 'Other users exist',
            data: {
              other_user: arrOfOtherUsers
            },
            user: {
              id: user.id,
              name: user.name,
              avatar: user.avatar,
              created_at: user.created_at
            },
            source
          }
        }else{
          return {
            status: false,
            message: 'No data for other users',
            source,
          }
        }
      }else{
        throw {
          status: 'User not found', 
          message: 'User not found',
          statusCode: 404,
        }
      }
    }catch(e){
        throw {
          status: e.status ? e.status : 'Server error' ,
          message: e.message ? e.message : 'Server error',
          statusCode: e.statusCode ? e.statusCode : 500
        }
    }
  }
}