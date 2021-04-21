import request from "supertest";

import app from '../../index';
import { fileReader, dataAccess } from '../util';
import { queries } from '../model/dataAccess';

let apiRoot: string;
beforeAll(async () => {
  apiRoot = 'api/v1/'
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
});

afterAll(async() => {
  await dataAccess.dropTables(['transactions', 'user']);
});

describe("user ", () => {
  it("user transaction", async () => {
    const result = await request(app).get(`${apiRoot}user/101`);
    // expect(result.text).toEqual("hello");
    expect(result.status).toEqual(200);
  });
});