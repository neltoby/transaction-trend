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
  test('user Exist and should return similar trend', async done => {
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
    done();
  })

  test('user does not Exist and should return user does not exist', async done => {
    expect.assertions(3);
    try{
      await otherUserCase(useCasereq({id: 500000}));
    }catch(e){
      expect(e).toHaveProperty('status', 'User not found');
      expect(e).toHaveProperty('message', 'User not found');
      expect(e).toHaveProperty('statusCode', 404);
      done();
    }
  })

})