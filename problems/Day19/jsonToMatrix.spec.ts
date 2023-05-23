import { describe, expect, it } from 'vitest';
import { jsonToMatrix } from './jsonToMatrix';

describe('jsonToMatrix', () => {
  it('should convert single object to matrix', () => {
    const arr = [{ a: 1, b: 2 }];
    const expected = [
      ['a', 'b'],
      [1, 2],
    ];

    expect(jsonToMatrix(arr)).toEqual(expected);
  });

  it('should convert array of objects with no nesting to matrix in correct order', () => {
    const arr = [
      { b: 1, a: 2 },
      { b: 3, a: 4 },
    ];
    const expected = [
      ['a', 'b'],
      [2, 1],
      [4, 3],
    ];

    expect(jsonToMatrix(arr)).toEqual(expected);
  });

  it('should handle objects with different key sets', () => {
    // prettier-ignore
    const arr = [
      { a: 1, b: 2 }, 
      { c: 3, d: 4 }, 
      {}
    ];
    const expected = [
      ['a', 'b', 'c', 'd'],
      [1, 2, '', ''],
      ['', '', 3, 4],
      ['', '', '', ''],
    ];

    expect(jsonToMatrix(arr)).toEqual(expected);
  });

  it('should handle objects with nested structures', () => {
    // prettier-ignore
    const arr = [
      { a: { b: 1, c: 2 } }, 
      { a: { b: 3, d: 4 } }
    ];
    const expected = [
      ['a.b', 'a.c', 'a.d'],
      [1, 2, ''],
      [3, '', 4],
    ];

    expect(jsonToMatrix(arr)).toEqual(expected);
  });

  it('should handle arrays treated as objects', () => {
    // prettier-ignore
    const arr = [
      [{ a: null }], 
      [{ b: true }], 
      [{ c: 'x' }]
    ];
    const expected = [
      ['0.a', '0.b', '0.c'],
      [null, '', ''],
      ['', true, ''],
      ['', '', 'x'],
    ];

    expect(jsonToMatrix(arr)).toEqual(expected);
  });

  it('should handle empty objects within array', () => {
    const arr = [{}, {}, {}];
    const expected = [[], [], [], []];

    expect(jsonToMatrix(arr)).toEqual(expected);
  });

  it('should handle deeply nested arrays', () => {
    const arr = [[[[1]]], [[[2]]], [[[3]]]];
    const expected = [['0.0.0'], [1], [2], [3]];

    expect(jsonToMatrix(arr)).toEqual(expected);
  });

  it('should handle deeply nested arrays with inconsistent depths', () => {
    const arr = [[[[1]]], [[2]], [3]];
    const expected = [
      ['0', '0.0', '0.0.0'],
      ['', '', 1],
      ['', 2, ''],
      [3, '', ''],
    ];

    expect(jsonToMatrix(arr)).toEqual(expected);
  });

  it('should handle complex user data with nested attributes', () => {
    const arr = [
      {
        _id: '64265e18f4596ed5b53673c1',
        index: 0,
        guid: 'bf29f675-5742-43a5-b667-d7158aa9cca4',
        isActive: true,
        balance: '$1,216.03',
        picture: 'http://placehold.it/32x32',
        age: 34,
        eyeColor: null,
        name: 'Roberts West',
        gender: 'male',
        company: 'GEEKY',
        email: 'robertswest@geeky.com',
        phone: '+1 (918) 600-2564',
        address: '584 Logan Street, Whitewater, Alaska, 1691',
        registered: '2022-12-24T06:42:37 +06:00',
        latitude: 82.029314,
        longitude: 88.713256,
        tags: ['et', true, 'velit', 'velit', 'ullamco', 'qui', 'nostrud'],
        friends: [
          { id: 0, name: 'Manuela Hart' },
          { id: 1, name: 'Janice Sykes' },
          { id: 2, name: 'Beasley Bonner' },
        ],
        greeting: 'Hello, Roberts West! You have 6 unread messages.',
        favoriteFruit: 'apple',
      },
      {
        _id: '0.0728693319274516',
        index: 0,
        guid: 'bf29f675-5742-43a5-b667-d7158aa9cca4',
        isActive: true,
        balance: '$1,216.03',
        picture: { x: true },
        age: 34,
        eyeColor: null,
        name: 'Roberts West',
        gender: 'male',
        company: 'GEEKY',
        email: 'robertswest@geeky.com',
        phone: '+1 (918) 600-2564',
        address: '584 Logan Street, Whitewater, Alaska, 1691',
        registered: '2022-12-24T06:42:37 +06:00',
        latitude: 82.029314,
        longitude: 88.713256,
        tags: ['et', true, 'velit', 'velit', [1], 'qui', { x: true }],
        friends: [
          { id: 0, name: { x: true } },
          { id: 1, name: 'Janice Sykes' },
          { id: 2, name: '0.16042429817957493' },
        ],
        greeting: 'Hello, Roberts West! You have 6 unread messages.',
        favoriteFruit: '0.14501613175204642',
      },
      {
        _id: '0.0728693319274516',
        index: 0,
        guid: 'bf29f675-5742-43a5-b667-d7158aa9cca4',
        isActive: true,
        balance: { x: true },
        picture: { x: { x: true } },
        age: 34,
        eyeColor: null,
        name: 'Roberts West',
        gender: 'male',
        company: 'GEEKY',
        email: '0.3309422623749263',
        phone: '+1 (918) 600-2564',
        address: '584 Logan Street, Whitewater, Alaska, 1691',
        registered: '0.13851459125712262',
        latitude: 82.029314,
        longitude: 88.713256,
        tags: ['et', true, 'velit', 'velit', [1], { x: true }, { x: true }],
        friends: [
          { id: 0, name: { x: { x: true } } },
          { id: 1, name: 'Janice Sykes' },
          { id: 2, name: '0.16042429817957493' },
        ],
        greeting: 'Hello, Roberts West! You have 6 unread messages.',
        favoriteFruit: '0.14501613175204642',
      },
      {
        _id: '0.0728693319274516',
        index: 0,
        guid: 'bf29f675-5742-43a5-b667-d7158aa9cca4',
        isActive: true,
        balance: { x: true },
        picture: { x: { x: { x: true } } },
        age: 34,
        eyeColor: null,
        name: 'Roberts West',
        gender: 'male',
        company: 'GEEKY',
        email: '0.3309422623749263',
        phone: '+1 (918) 600-2564',
        address: '584 Logan Street, Whitewater, Alaska, 1691',
        registered: '0.13851459125712262',
        latitude: 82.029314,
        longitude: 88.713256,
        tags: [
          'et',
          true,
          '0.05257375444042278',
          'velit',
          ['0.11232390443394835'],
          { x: [1] },
          { x: true },
        ],
        friends: [
          { id: 0, name: { x: { x: true } } },
          { id: 1, name: 'Janice Sykes' },
          { id: { x: true }, name: '0.16042429817957493' },
        ],
        greeting: { x: true },
        favoriteFruit: '0.14501613175204642',
      },
      {
        _id: '0.0728693319274516',
        index: 0,
        guid: 'bf29f675-5742-43a5-b667-d7158aa9cca4',
        isActive: true,
        balance: { x: true },
        picture: { x: { x: { x: true } } },
        age: 34,
        eyeColor: '0.06649716622497093',
        name: 'Roberts West',
        gender: 'male',
        company: 'GEEKY',
        email: '0.3309422623749263',
        phone: '0.8836718715333238',
        address: '584 Logan Street, Whitewater, Alaska, 1691',
        registered: '0.13851459125712262',
        latitude: 82.029314,
        longitude: [1],
        tags: [
          'et',
          { x: true },
          '0.05257375444042278',
          'velit',
          ['0.11232390443394835'],
          { x: [1] },
          { x: true },
        ],
        friends: [
          { id: '0.32667837388350995', name: { x: { x: true } } },
          { id: 1, name: { x: true } },
          { id: { x: true }, name: '0.16042429817957493' },
        ],
        greeting: { x: { x: true } },
        favoriteFruit: '0.14501613175204642',
      },
      {
        _id: '0.0728693319274516',
        index: 0,
        guid: '0.7583957237124486',
        isActive: { x: true },
        balance: { x: true },
        picture: { x: { x: { x: true } } },
        age: 34,
        eyeColor: '0.06649716622497093',
        name: 'Roberts West',
        gender: '0.14281123675053964',
        company: 'GEEKY',
        email: '0.3309422623749263',
        phone: '0.8836718715333238',
        address: '584 Logan Street, Whitewater, Alaska, 1691',
        registered: '0.13851459125712262',
        latitude: 82.029314,
        longitude: [{ x: true }],
        tags: [
          'et',
          { x: true },
          '0.05257375444042278',
          'velit',
          ['0.11232390443394835'],
          { x: [{ x: true }] },
          { x: [1] },
        ],
        friends: [
          { id: '0.32667837388350995', name: { x: { x: true } } },
          { id: 1, name: { x: true } },
          { id: { x: true }, name: '0.16042429817957493' },
        ],
        greeting: { x: { x: true } },
        favoriteFruit: '0.14501613175204642',
      },
      {
        _id: '0.0728693319274516',
        index: 0,
        guid: '0.7583957237124486',
        isActive: { x: true },
        balance: { x: true },
        picture: { x: { x: { x: true } } },
        age: 34,
        eyeColor: '0.06649716622497093',
        name: 'Roberts West',
        gender: '0.14281123675053964',
        company: 'GEEKY',
        email: '0.3309422623749263',
        phone: '0.8836718715333238',
        address: '584 Logan Street, Whitewater, Alaska, 1691',
        registered: '0.13851459125712262',
        latitude: 82.029314,
        longitude: [{ x: '0.0964325368871446' }],
        tags: [
          '0.7598244192641979',
          { x: true },
          '0.05257375444042278',
          'velit',
          ['0.11232390443394835'],
          { x: [{ x: true }] },
          { x: [1] },
        ],
        friends: [
          { id: '0.5874553769807973', name: { x: { x: { x: true } } } },
          { id: 1, name: { x: true } },
          { id: { x: '0.24065403249704986' }, name: '0.16042429817957493' },
        ],
        greeting: { x: { x: true } },
        favoriteFruit: '0.14501613175204642',
      },
      {
        _id: '0.26010278482396343',
        index: 0,
        guid: '0.7583957237124486',
        isActive: { x: '0.05239055239447987' },
        balance: { x: true },
        picture: { x: { x: { x: true } } },
        age: 34,
        eyeColor: '0.15987950478747592',
        name: 'Roberts West',
        gender: '0.14281123675053964',
        company: 'GEEKY',
        email: '0.3309422623749263',
        phone: '0.8836718715333238',
        address: '584 Logan Street, Whitewater, Alaska, 1691',
        registered: [1],
        latitude: 82.029314,
        longitude: [{ x: '0.0964325368871446' }],
        tags: [
          '0.45280704371287195',
          { x: true },
          '0.05257375444042278',
          'velit',
          ['0.11232390443394835'],
          { x: [{ x: '0.3406935749521298' }] },
          { x: ['0.5564914324490853'] },
        ],
        friends: [
          { id: '0.47403864217462943', name: { x: { x: { x: true } } } },
          { id: 1, name: { x: true } },
          { id: { x: '0.24065403249704986' }, name: '0.16042429817957493' },
        ],
        greeting: { x: { x: [1] } },
        favoriteFruit: '0.14501613175204642',
      },
      {
        _id: '0.26010278482396343',
        index: 0,
        guid: '0.7583957237124486',
        isActive: { x: '0.05239055239447987' },
        balance: { x: '0.4828311027445322' },
        picture: { x: { x: { x: true } } },
        age: 34,
        eyeColor: '0.15987950478747592',
        name: 'Roberts West',
        gender: '0.14281123675053964',
        company: 'GEEKY',
        email: '0.3309422623749263',
        phone: '0.8836718715333238',
        address: '584 Logan Street, Whitewater, Alaska, 1691',
        registered: [1],
        latitude: 82.029314,
        longitude: [{ x: '0.0964325368871446' }],
        tags: [
          '0.45280704371287195',
          { x: true },
          '0.05257375444042278',
          'velit',
          ['0.6203172696749151'],
          { x: [{ x: '0.3406935749521298' }] },
          { x: ['0.014613800835636903'] },
        ],
        friends: [
          { id: '0.47403864217462943', name: { x: { x: { x: true } } } },
          { id: 1, name: { x: true } },
          { id: { x: '0.24065403249704986' }, name: '0.16042429817957493' },
        ],
        greeting: { x: { x: [1] } },
        favoriteFruit: '0.14501613175204642',
      },
      {
        _id: '0.26010278482396343',
        index: 0,
        guid: '0.193807129007179',
        isActive: { x: '0.05239055239447987' },
        balance: { x: '0.4828311027445322' },
        picture: { x: { x: { x: true } } },
        age: 34,
        eyeColor: '0.15987950478747592',
        name: [1],
        gender: '0.14281123675053964',
        company: 'GEEKY',
        email: '0.3309422623749263',
        phone: '0.8836718715333238',
        address: '584 Logan Street, Whitewater, Alaska, 1691',
        registered: [1],
        latitude: 82.029314,
        longitude: [{ x: '0.0964325368871446' }],
        tags: [
          '0.4530685346478853',
          { x: true },
          '0.05257375444042278',
          'velit',
          ['0.6203172696749151'],
          { x: [{ x: { x: true } }] },
          { x: ['0.014613800835636903'] },
        ],
        friends: [
          { id: '0.47403864217462943', name: { x: { x: { x: true } } } },
          { id: 1, name: { x: true } },
          { id: { x: '0.24065403249704986' }, name: '0.16042429817957493' },
        ],
        greeting: { x: { x: [1] } },
        favoriteFruit: '0.14501613175204642',
      },
    ];

    const expected = [
      [
        '_id',
        'address',
        'age',
        'balance',
        'balance.x',
        'company',
        'email',
        'eyeColor',
        'favoriteFruit',
        'friends.0.id',
        'friends.0.name',
        'friends.0.name.x',
        'friends.0.name.x.x',
        'friends.0.name.x.x.x',
        'friends.1.id',
        'friends.1.name',
        'friends.1.name.x',
        'friends.2.id',
        'friends.2.id.x',
        'friends.2.name',
        'gender',
        'greeting',
        'greeting.x',
        'greeting.x.x',
        'greeting.x.x.0',
        'guid',
        'index',
        'isActive',
        'isActive.x',
        'latitude',
        'longitude',
        'longitude.0',
        'longitude.0.x',
        'name',
        'name.0',
        'phone',
        'picture',
        'picture.x',
        'picture.x.x',
        'picture.x.x.x',
        'registered',
        'registered.0',
        'tags.0',
        'tags.1',
        'tags.1.x',
        'tags.2',
        'tags.3',
        'tags.4',
        'tags.4.0',
        'tags.5',
        'tags.5.x',
        'tags.5.x.0',
        'tags.5.x.0.x',
        'tags.5.x.0.x.x',
        'tags.6',
        'tags.6.x',
        'tags.6.x.0',
      ],
      [
        '64265e18f4596ed5b53673c1',
        '584 Logan Street, Whitewater, Alaska, 1691',
        34,
        '$1,216.03',
        '',
        'GEEKY',
        'robertswest@geeky.com',
        null,
        'apple',
        0,
        'Manuela Hart',
        '',
        '',
        '',
        1,
        'Janice Sykes',
        '',
        2,
        '',
        'Beasley Bonner',
        'male',
        'Hello, Roberts West! You have 6 unread messages.',
        '',
        '',
        '',
        'bf29f675-5742-43a5-b667-d7158aa9cca4',
        0,
        true,
        '',
        82.029314,
        88.713256,
        '',
        '',
        'Roberts West',
        '',
        '+1 (918) 600-2564',
        'http://placehold.it/32x32',
        '',
        '',
        '',
        '2022-12-24T06:42:37 +06:00',
        '',
        'et',
        true,
        '',
        'velit',
        'velit',
        'ullamco',
        '',
        'qui',
        '',
        '',
        '',
        '',
        'nostrud',
        '',
        '',
      ],
      [
        '0.0728693319274516',
        '584 Logan Street, Whitewater, Alaska, 1691',
        34,
        '$1,216.03',
        '',
        'GEEKY',
        'robertswest@geeky.com',
        null,
        '0.14501613175204642',
        0,
        '',
        true,
        '',
        '',
        1,
        'Janice Sykes',
        '',
        2,
        '',
        '0.16042429817957493',
        'male',
        'Hello, Roberts West! You have 6 unread messages.',
        '',
        '',
        '',
        'bf29f675-5742-43a5-b667-d7158aa9cca4',
        0,
        true,
        '',
        82.029314,
        88.713256,
        '',
        '',
        'Roberts West',
        '',
        '+1 (918) 600-2564',
        '',
        true,
        '',
        '',
        '2022-12-24T06:42:37 +06:00',
        '',
        'et',
        true,
        '',
        'velit',
        'velit',
        '',
        1,
        'qui',
        '',
        '',
        '',
        '',
        '',
        true,
        '',
      ],
      [
        '0.0728693319274516',
        '584 Logan Street, Whitewater, Alaska, 1691',
        34,
        '',
        true,
        'GEEKY',
        '0.3309422623749263',
        null,
        '0.14501613175204642',
        0,
        '',
        '',
        true,
        '',
        1,
        'Janice Sykes',
        '',
        2,
        '',
        '0.16042429817957493',
        'male',
        'Hello, Roberts West! You have 6 unread messages.',
        '',
        '',
        '',
        'bf29f675-5742-43a5-b667-d7158aa9cca4',
        0,
        true,
        '',
        82.029314,
        88.713256,
        '',
        '',
        'Roberts West',
        '',
        '+1 (918) 600-2564',
        '',
        '',
        true,
        '',
        '0.13851459125712262',
        '',
        'et',
        true,
        '',
        'velit',
        'velit',
        '',
        1,
        '',
        true,
        '',
        '',
        '',
        '',
        true,
        '',
      ],
      [
        '0.0728693319274516',
        '584 Logan Street, Whitewater, Alaska, 1691',
        34,
        '',
        true,
        'GEEKY',
        '0.3309422623749263',
        null,
        '0.14501613175204642',
        0,
        '',
        '',
        true,
        '',
        1,
        'Janice Sykes',
        '',
        '',
        true,
        '0.16042429817957493',
        'male',
        '',
        true,
        '',
        '',
        'bf29f675-5742-43a5-b667-d7158aa9cca4',
        0,
        true,
        '',
        82.029314,
        88.713256,
        '',
        '',
        'Roberts West',
        '',
        '+1 (918) 600-2564',
        '',
        '',
        '',
        true,
        '0.13851459125712262',
        '',
        'et',
        true,
        '',
        '0.05257375444042278',
        'velit',
        '',
        '0.11232390443394835',
        '',
        '',
        1,
        '',
        '',
        '',
        true,
        '',
      ],
      [
        '0.0728693319274516',
        '584 Logan Street, Whitewater, Alaska, 1691',
        34,
        '',
        true,
        'GEEKY',
        '0.3309422623749263',
        '0.06649716622497093',
        '0.14501613175204642',
        '0.32667837388350995',
        '',
        '',
        true,
        '',
        1,
        '',
        true,
        '',
        true,
        '0.16042429817957493',
        'male',
        '',
        '',
        true,
        '',
        'bf29f675-5742-43a5-b667-d7158aa9cca4',
        0,
        true,
        '',
        82.029314,
        '',
        1,
        '',
        'Roberts West',
        '',
        '0.8836718715333238',
        '',
        '',
        '',
        true,
        '0.13851459125712262',
        '',
        'et',
        '',
        true,
        '0.05257375444042278',
        'velit',
        '',
        '0.11232390443394835',
        '',
        '',
        1,
        '',
        '',
        '',
        true,
        '',
      ],
      [
        '0.0728693319274516',
        '584 Logan Street, Whitewater, Alaska, 1691',
        34,
        '',
        true,
        'GEEKY',
        '0.3309422623749263',
        '0.06649716622497093',
        '0.14501613175204642',
        '0.32667837388350995',
        '',
        '',
        true,
        '',
        1,
        '',
        true,
        '',
        true,
        '0.16042429817957493',
        '0.14281123675053964',
        '',
        '',
        true,
        '',
        '0.7583957237124486',
        0,
        '',
        true,
        82.029314,
        '',
        '',
        true,
        'Roberts West',
        '',
        '0.8836718715333238',
        '',
        '',
        '',
        true,
        '0.13851459125712262',
        '',
        'et',
        '',
        true,
        '0.05257375444042278',
        'velit',
        '',
        '0.11232390443394835',
        '',
        '',
        '',
        true,
        '',
        '',
        '',
        1,
      ],
      [
        '0.0728693319274516',
        '584 Logan Street, Whitewater, Alaska, 1691',
        34,
        '',
        true,
        'GEEKY',
        '0.3309422623749263',
        '0.06649716622497093',
        '0.14501613175204642',
        '0.5874553769807973',
        '',
        '',
        '',
        true,
        1,
        '',
        true,
        '',
        '0.24065403249704986',
        '0.16042429817957493',
        '0.14281123675053964',
        '',
        '',
        true,
        '',
        '0.7583957237124486',
        0,
        '',
        true,
        82.029314,
        '',
        '',
        '0.0964325368871446',
        'Roberts West',
        '',
        '0.8836718715333238',
        '',
        '',
        '',
        true,
        '0.13851459125712262',
        '',
        '0.7598244192641979',
        '',
        true,
        '0.05257375444042278',
        'velit',
        '',
        '0.11232390443394835',
        '',
        '',
        '',
        true,
        '',
        '',
        '',
        1,
      ],
      [
        '0.26010278482396343',
        '584 Logan Street, Whitewater, Alaska, 1691',
        34,
        '',
        true,
        'GEEKY',
        '0.3309422623749263',
        '0.15987950478747592',
        '0.14501613175204642',
        '0.47403864217462943',
        '',
        '',
        '',
        true,
        1,
        '',
        true,
        '',
        '0.24065403249704986',
        '0.16042429817957493',
        '0.14281123675053964',
        '',
        '',
        '',
        1,
        '0.7583957237124486',
        0,
        '',
        '0.05239055239447987',
        82.029314,
        '',
        '',
        '0.0964325368871446',
        'Roberts West',
        '',
        '0.8836718715333238',
        '',
        '',
        '',
        true,
        '',
        1,
        '0.45280704371287195',
        '',
        true,
        '0.05257375444042278',
        'velit',
        '',
        '0.11232390443394835',
        '',
        '',
        '',
        '0.3406935749521298',
        '',
        '',
        '',
        '0.5564914324490853',
      ],
      [
        '0.26010278482396343',
        '584 Logan Street, Whitewater, Alaska, 1691',
        34,
        '',
        '0.4828311027445322',
        'GEEKY',
        '0.3309422623749263',
        '0.15987950478747592',
        '0.14501613175204642',
        '0.47403864217462943',
        '',
        '',
        '',
        true,
        1,
        '',
        true,
        '',
        '0.24065403249704986',
        '0.16042429817957493',
        '0.14281123675053964',
        '',
        '',
        '',
        1,
        '0.7583957237124486',
        0,
        '',
        '0.05239055239447987',
        82.029314,
        '',
        '',
        '0.0964325368871446',
        'Roberts West',
        '',
        '0.8836718715333238',
        '',
        '',
        '',
        true,
        '',
        1,
        '0.45280704371287195',
        '',
        true,
        '0.05257375444042278',
        'velit',
        '',
        '0.6203172696749151',
        '',
        '',
        '',
        '0.3406935749521298',
        '',
        '',
        '',
        '0.014613800835636903',
      ],
      [
        '0.26010278482396343',
        '584 Logan Street, Whitewater, Alaska, 1691',
        34,
        '',
        '0.4828311027445322',
        'GEEKY',
        '0.3309422623749263',
        '0.15987950478747592',
        '0.14501613175204642',
        '0.47403864217462943',
        '',
        '',
        '',
        true,
        1,
        '',
        true,
        '',
        '0.24065403249704986',
        '0.16042429817957493',
        '0.14281123675053964',
        '',
        '',
        '',
        1,
        '0.193807129007179',
        0,
        '',
        '0.05239055239447987',
        82.029314,
        '',
        '',
        '0.0964325368871446',
        '',
        1,
        '0.8836718715333238',
        '',
        '',
        '',
        true,
        '',
        1,
        '0.4530685346478853',
        '',
        true,
        '0.05257375444042278',
        'velit',
        '',
        '0.6203172696749151',
        '',
        '',
        '',
        '',
        true,
        '',
        '',
        '0.014613800835636903',
      ],
    ];

    expect(jsonToMatrix(arr)).toEqual(expected);
  });
});
