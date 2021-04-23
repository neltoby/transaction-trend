import { otherUserController } from '.';
import { dataAccess, fileReader } from '../util';
import { queries } from '../model/dataAccess';
import { useControllerReq } from '../__test__/constant';

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

describe('otherUserController', () => {
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

  test('otherUserController should return 200 with valid user', async done => {
    const res = await otherUserController(useControllerReq({}));
    console.log(res);
    const { 
      headers,
      statusCode,
      body
    } = res;
    expect(statusCode).toBe(200);
    expect(headers).toHaveProperty('Content-Type');
    expect(body).toBeDefined();
    expect(body).toHaveProperty('status', true);
    done();
  })

  test('otherUserController should return 200 with invalid user but status false', async done => {
    const res = await otherUserController(useControllerReq({params: { id: 50000}}));
    const { 
      headers,
      statusCode,
      body
    } = res;
    console.log(res);
    expect(statusCode).toBe(404);
    expect(headers).toHaveProperty('Content-Type');
    expect(body).toHaveProperty('error', 'User not found');
    done();
  })
})