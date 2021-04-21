import { otherUserCase } from '.';
import { useCasereq } from '../__test__/constant';
import { fileReader, dataAccess } from '../util';
import { queries } from '../model/dataAccess'


beforeAll(async () => {
    const { createUserTable } = queries;
    let columnList = [
      'id',
      'first_name',
      'last_name',
      'avatar',
      'created_at'
    ];
    const callback: any = fileReader(
      'users.csv', 
      columnList, 
      createUserTable
    );
    await callback(dataAccess.tableCreationAndInsert, dataAccess); 
  })

  afterAll( async () => {
    await dataAccess.dropTables(['transactions', 'user']);
  })

describe('otherUserCase suite', () => {
  beforeAll(async () => {
    const { createTransactionTable } = queries;
    let columnList = [
      'id',
      'user_id',
      'amount',
      'type',
      'date_time', 
      'category', 
      'icon_url'
    ];
    const callback: any = fileReader(
      'transactions.csv', 
      columnList, 
      createTransactionTable
    );
    await callback(dataAccess.tableCreationAndInsert, dataAccess); 
  })
  test('user Exist and should return similar trend', async () => {
    const otherUserTrend = await otherUserCase(useCasereq({}));
    const { 
      status,
      message,
      data,
      user,
      source
    } = otherUserTrend
    expect(status).toBe(true);
    expect(message).toBe('Other users exist');
    expect(data).toHaveProperty('other_user');
    expect(user).toBeDefined();
    expect(source).toBeDefined();
  })

  test('user does not Exist and should return user does not exist', async () => {
    const userTrend = await otherUserCase(useCasereq({id: 500000}));
    const { 
      status,
      message,
      source
    } = userTrend
    expect(status).toBe(false);
    expect(message).toBe('User not found');
    expect(source).toBeDefined();
  })

})