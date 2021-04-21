import { databaseConfigObject } from '../db';
import { IDatabaseConfigAttributes } from '../dbInterface/dbConfig.interface';
import { ICreateTable, IInsertAll } from '../dbInterface/query.interface';
import { IUsers } from '../../user-expense-trend/transaction';
import DataAccess, { queries} from '.';
import { dataAccess } from '../../util';

import { values } from '../../__test__/constant';

afterAll(async () => {
  await dataAccess.dropTables(['users'])
})

describe('dataAccess service', () => { 

  test('setInsertAllQuery method', () => {
    const query = dataAccess.setInsertAllQuery(values, 'user', ['id', 'first_name','last_name', 'avatar', 'created_at'])
    console.log(query);
    const expected = 'INSERT INTO user (id,first_name,last_name,avatar,created_at) VALUES ($1, $2, $3, $4, $5), ($6, $7, $8, $9, $10), ($11, $12, $13, $14, $15) ON CONFLICT (id) DO NOTHING RETURNING id';
    expect(query).toBe(expected)
  })

  test('structureQuery method', () => {
    const { createUserTable } = queries;
    const { status, query, tableName } = dataAccess.structureQuery(createUserTable)
    console.log(query)
    expect(status).toBe(true);
    expect(tableName).toBe('Users')
  })

  test('createTable method should create a user table', async () => {
    const { createUserTable } = queries
    const res: ICreateTable = await dataAccess.createTable(createUserTable)
    const { status, name } = res
    expect(status).toBe(true)
    expect(name).toBe('Users')
  })

  test('insertAll method should insert all given data', async () => {
    const response: IInsertAll = await dataAccess.insertAll(values, 'users', ['id','first_name','last_name','avatar','created_at'])
    const { status, res } = response;
    console.log(res)
    expect(status).toBe(true)
  })
  test('tableCreationAndInsert method should return insert response', async () => {
    const { createUserTable } = queries
    const response = await dataAccess.tableCreationAndInsert(values, createUserTable, ['id','first_name','last_name','avatar','created_at']);
    const { status, res } = response;
    console.log(res)
    expect(status).toBe(true)
  })
  test('find method should run', async () => {
    const { findUserDetails } = queries
    const res: any[] = await dataAccess.find({
      text: findUserDetails, 
      values: [101],
      name: 'user-info'
    });
    const user: IUsers = res[0];
    expect(user.created_at).toBeDefined();
    expect(user.id).toBe(101);
    expect(user.first_name).toBeDefined();
    expect(user.last_name).toBeDefined();
    expect(user.avatar).toBeDefined();
  })

  // test('dropTables method', async () => {
  //     const res = await dataAccess.dropTables(['users'])
  //     expect(res.status).toBe(true);
  //     expect(res.message).toBe('Table dropped');
  // })
})
