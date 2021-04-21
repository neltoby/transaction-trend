import Transaction from '.'

import { transfer } from '../../__test__/constant'

describe('Transaction service suite', () => {
  test('transfet service', () => {
    const details = new Transaction(transfer)
    expect(details.icon_url.length).toBe(3);
    expect(details.amount).toBe(10300);
    expect(details.transactions).toBe(15);
  })
})