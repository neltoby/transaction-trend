import User from '.';

describe('User service class', () => {
  test('user', () => {
    const user = new User(
    'Azubuike', 
      'Abodurin', 
      101,
      'https://randomuser.me/api/portraits/men/33.jpg',
      '2019-10-13 09:38:07',
    );
    expect(user.name).toBe('Azubuike Abodurin');
    expect(user.id).toBe(101);
    expect(user.avatar).toBe('https://randomuser.me/api/portraits/men/33.jpg');
    expect(user.created_at).toBe('2019-10-13 09:38:07');
  })
})