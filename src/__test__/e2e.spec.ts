import request from "supertest";

import app from '../../app';
import { fileReader, dataAccess } from '../util';
import { queries } from '../model/dataAccess';

let apiRoot: string = '/api/v1/';

afterAll(async() => {
  await dataAccess.dropTables(['transactions', 'user']);
});

describe("get user route", () => {
  test("get valid user route", async done => {
    const result = await request(app).get(`${apiRoot}user/101`);
    expect(result.body).toHaveProperty('status', true)
    expect(result.body).toHaveProperty('message', 'Transactions exist');
    expect(result.body).toHaveProperty('data');
    expect(result.body).toHaveProperty('transaction_count');
    expect(result.body).toHaveProperty('source');
    expect(result.status).toEqual(200);
    done()
  });

  test("get invalid user route", async done => {
    const result = await request(app).get(`${apiRoot}user/50000`);
    expect(result.body).toHaveProperty('error', 'User not found');
    expect(result.status).toEqual(404);
    done()
  });
});

describe("get trend route", () => {
  test("get valid user route", async done => {
    const result = await request(app).get(`${apiRoot}trend/101`);
    expect(result.body).toHaveProperty('status', true)
    expect(result.body).toHaveProperty('message', 'Other users exist');
    expect(result.body).toHaveProperty('data');
    expect(result.body).toHaveProperty('user');
    expect(result.body).toHaveProperty('source');
    expect(result.status).toEqual(200);
    done()
  });

  test("get invalid user trend route", async done => {
    const result = await request(app).get(`${apiRoot}trend/50000`);
    expect(result.body).toHaveProperty('error', 'User not found');
    expect(result.status).toEqual(404);
    done();
  });
});