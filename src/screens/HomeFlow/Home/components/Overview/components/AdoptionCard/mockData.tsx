// SPDX-License-Identifier: BUSL-1.1

export type Level = {
  id: string;
  active: boolean;
  completed: boolean;
  icePerHour: number;
  usersCount: number;
};

export const levelItems: Level[] = [
  {
    id: '1',
    active: false,
    completed: true,
    icePerHour: 5,
    usersCount: 25000,
  },
  {
    id: '2',
    active: false,
    completed: true,
    icePerHour: 10,
    usersCount: 50000,
  },
  {
    id: '3',
    active: false,
    completed: true,
    icePerHour: 15,
    usersCount: 100000,
  },
  {
    id: '4',
    active: false,
    completed: true,
    icePerHour: 20,
    usersCount: 200000,
  },
  {
    id: '5',
    active: false,
    completed: true,
    icePerHour: 25,
    usersCount: 400000,
  },
  {
    id: '6',
    active: false,
    completed: true,
    icePerHour: 50,
    usersCount: 800000,
  },
  {
    id: '7',
    active: true,
    completed: false,
    icePerHour: 100,
    usersCount: 1000000,
  },
  {
    id: '8',
    active: false,
    completed: false,
    icePerHour: 200,
    usersCount: 3000000,
  },
];
