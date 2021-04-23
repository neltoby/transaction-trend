import AllUser from '../user-expense-trend/user/all-users';

export interface IGetCache {
  action: string,
  success: boolean,
  message: string,
  value?: AllUser[],
}