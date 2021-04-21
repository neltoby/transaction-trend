import { userCase } from '.';
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

  afterAll(async() => {
    await dataAccess.dropTables(['transactions', 'user']);
  })
describe('userCase suite', () => {
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
  test('user Exist and should return user and transactiona', async () => {
    const userTrend = await userCase(useCasereq({}));
    const { 
      status,
      message,
      data,
      transaction_count,
      source
    } = userTrend
    expect(status).toBe(true);
    expect(message).toBe('Transactions exist');
    expect(data).toHaveProperty('transaction');
    expect(transaction_count).toBeDefined();
    expect(source).toBeDefined();
  })

  test('user does not Exist and should return user does not exist', async () => {
    const userTrend = await userCase(useCasereq({id: 500000}));
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