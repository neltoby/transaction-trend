import UserTrend from '.';
import Transactions from '../../transaction'
import { transfer } from '../../../__test__/constant'

describe('UserTrend service class', () => {
  test('userTrend', () => {
    const transaction = new Transactions(transfer);
    const user = new UserTrend(
      'Azubuike', 
      'Abodurin', 
      101,
      'https://randomuser.me/api/portraits/men/33.jpg',
      '2019-10-13 09:38:07',
      transaction
    );
    expect(user.name).toBe('Azubuike Abodurin');
    expect(user.id).toBe(101);
    expect(user.avatar).toBe('https://randomuser.me/api/portraits/men/33.jpg');
    expect(user.created_at).toBe('2019-10-13 09:38:07');
    expect(user.transactions.transactions).toBe(15);
    expect(user.transactions.amount).toBe(10300);
    expect(user.transactions.icon_url.length).toBe(3)
  })
})