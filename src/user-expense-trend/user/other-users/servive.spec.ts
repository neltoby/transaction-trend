import OtherUsers from '.'

describe('OtherUsers service class', () => {
  test('otherUsers service', () => {
    const otheruser = new OtherUsers(
    'Azubuike', 
      'Abodurin', 
      101,
      'https://randomuser.me/api/portraits/men/33.jpg',
      '2019-10-13 09:38:07',
      80
    );
    expect(otheruser.name).toBe('Azubuike Abodurin');
    expect(otheruser.id).toBe(101);
    expect(otheruser.avatar).toBe('https://randomuser.me/api/portraits/men/33.jpg');
    expect(otheruser.created_at).toBe('2019-10-13 09:38:07');
    expect(otheruser.transactions).toBe(80);
  })
})