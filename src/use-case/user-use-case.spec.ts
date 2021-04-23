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
  test('user Exist and should return user and transactiona', async done => {
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
    done();
  })

  test('user does not Exist and should throw', async () => {
    expect.assertions(2);
    try{
      await userCase(useCasereq({id: 500000}));
    }catch(e){
      console.log(e)
      expect(e).toHaveProperty('message','User not found');
      expect(e).toHaveProperty('statusCode',404);
    }
  })

})