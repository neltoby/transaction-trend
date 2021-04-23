import AllUser from '.'

describe('AllUser service class', () => {
  test('user', () => {
    const alluser = new AllUser(
    'Azubuike', 
      'Abodurin', 
      101,
      'https://randomuser.me/api/portraits/men/33.jpg',
      '2019-10-13 09:38:07',
      30
    );
    expect(alluser.name).toBe('Azubuike Abodurin');
    expect(alluser.id).toBe(101);
    expect(alluser.avatar).toBe('https://randomuser.me/api/portraits/men/33.jpg');
    expect(alluser.created_at).toBe('2019-10-13 09:38:07');
    expect(alluser.transactions).toBe(30);
  })
})