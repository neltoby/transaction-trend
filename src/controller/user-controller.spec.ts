import { userController } from '.';
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

describe('userController', () => {
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

  test('userController should return 200 with valid user', async () => {
    const res = await userController(useControllerReq({}));
    const { 
      headers,
      statusCode,
      body
    } = res;
    expect(statusCode).toBe(200);
    expect(headers).toHaveProperty('Content-Type');
    expect(body).toBeDefined();
    expect(body).toHaveProperty('status', true);
  })

  test('userController should return 200 with invalid user but status false', async () => {
    const res = await userController(useControllerReq({params: { id: 50000}}));
    const { 
      headers,
      statusCode,
      body
    } = res;
    expect(statusCode).toBe(200);
    expect(headers).toHaveProperty('Content-Type');
    expect(body).toBeDefined();
    expect(body).toHaveProperty('status', false);
  })
})