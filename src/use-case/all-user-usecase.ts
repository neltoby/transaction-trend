import DataAccess from '../model/dataAccess';
import { queries } from '../model/dataAccess';
import AllUser from '../user-expense-trend/user/all-users';
import { IOtherUsers } from '../user-expense-trend/transaction';
import { IGetCache } from '../util';
import LogClass from '../logger/service';

  export default function makeAllUserCase ({ dataAccess, cache, logger }: 
    {
      dataAccess: DataAccess, 
      cache: {
        getVariable: (val: string) => Promise<IGetCache>, 
        cacheVariable: ({varName, varValue}: {varName: string, varValue: any}) => Promise<IGetCache> 
      },
      logger: LogClass,
    }) {
  return async function allUserCase (req: {ip: string, browser: string, referrer?: string} ): Promise<any> {
    const source = req;
    const cacheName: string = 'all-users';
    const { getVariable, cacheVariable } = cache;
    const getAllUsers = await getVariable(cacheName);
    const { success } = getAllUsers;
    let allUsers: any[];
    if(success && getAllUsers.value !== undefined){
      allUsers = getAllUsers.value;       
    }else{
      const { findAllUser } = queries;
      const res: IOtherUsers[] = await dataAccess.findAll({
        text: findAllUser,
        name: 'all-users'
      });
      const getUserProfile = res.map((item: IOtherUsers, i) => {
        const {
          first_name,
          last_name,
          id,
          avatar,
          created_at, 
          transactions
        } = item;
        return new AllUser(
          first_name, 
          last_name,
          id,
          avatar,
          created_at,
          transactions
        );
      })
      allUsers = getUserProfile.map((item, i) => {
        return {
          name: item.name,
          avatar: item.avatar,
          created_at: item.created_at,
          id: item.id,
          transactions: item.transactions
        }
      })
      const { success } = await cacheVariable({varName:cacheName, varValue: allUsers});
      if(!success){
        logger.error(
          `${new Date()} - value could not be cached`
        )
      }
    }
  
    return {
      status: true,
      message: 'All current user',
      data: {
        all_user: allUsers
      }, 
      source
    }
  }
}