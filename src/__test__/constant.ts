import faker from 'faker';
export const values = [
  [
      101,
      'Azubuike',
      'Abodunrin',
      'https://randomuser.me/api/portraits/men/33.jpg',  
      '2019-10-13 9:38:07'
    ],
    [
      107,
      'Oluwunmi',
      'Chibuike',
      'https://randomuser.me/api/portraits/women/25.jpg',
      '2020-06-16 18:57:47'
    ],
    [
      194,
      'Chizoba',
      'Sarah',
      'https://randomuser.me/api/portraits/women/86.jpg',
      '2020-09-09 13:19:06'
    ],
]

export const transfer = [
  {
    avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
    created_at: '2019-10-13 09:38:07',
    amount: 5100,
    transactions: 6,
    category: 'airfare',
    icon_url: 'https://api.kliqr.com/images/icons/tags/airfare.png'
  },
  {
    avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
    created_at: '2019-10-13 09:38:07',
    amount: 5100,
    transactions: 6,
    category: 'airfare',
    icon_url: 'https://api.kliqr.com/images/icons/tags/airfare.png'
  },
  {
    avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
    created_at: '2019-10-13 09:38:07',
    amount: 100,
    transactions: 3,
    category: 'airtime',
    icon_url: 'https://api.kliqr.com/images/icons/tags/airtime.png'
  }
]

export const useCasereq = (val: any) => {
  const req = {
    id: 101, 
    source: {
      ip: faker.internet.ip(),
      referer: faker.internet.url(),
      browser: faker.internet.userAgent(),
    }
  }
  return {
    ...req,
    ...val
  }
}

export const useControllerReq = (val: any) => {
  const req = {
    ip: faker.internet.ip(),
    headers: {      
      'Content-Type': 'appplication/json',
      Referer: faker.internet.url(),
      'User-Agent': faker.internet.userAgent(),
    },
    params: {
      id: 101
    }
  }
  return {
    ...req,
    ...val
  }
}