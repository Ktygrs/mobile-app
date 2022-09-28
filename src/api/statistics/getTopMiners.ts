// SPDX-License-Identifier: BUSL-1.1

import {Miner} from '@api/statistics/types';

/**
 * Returns the paginated view of users per country.
 */

type Params = {
  query: string;
  limit?: number;
  offset?: number;
};

export const TOP_MINERS: Miner[] = [
  {
    id: Math.random().toString(),
    username: 'iulianflyby',
    profilePictureUrl:
      'https://ice-staging.b-cdn.net/profile/default-profile-picture-10.png',
    iceAmount: '214,144,114',
    checksum: '',
  },
  {
    id: Math.random().toString(),
    username: 'joshitinnograt',
    profilePictureUrl:
      'https://ice-staging.b-cdn.net/profile/default-profile-picture-11.png',
    iceAmount: '156,144,114',
    checksum: '',
  },
  {
    id: Math.random().toString(),
    username: 'andremary',
    profilePictureUrl:
      'https://ice-staging.b-cdn.net/profile/default-profile-picture-12.png',
    iceAmount: '94,541,009',
    checksum: '',
  },
  {
    id: Math.random().toString(),
    username: 'parisdophie92',
    profilePictureUrl:
      'https://ice-staging.b-cdn.net/profile/default-profile-picture-13.png',
    iceAmount: '4,144,114',
    checksum: '',
  },
  {
    id: Math.random().toString(),
    username: 'mikehush',
    profilePictureUrl:
      'https://ice-staging.b-cdn.net/profile/default-profile-picture-14.png',
    iceAmount: '613,190',
    checksum: '',
  },
  {
    id: Math.random().toString(),
    username: 'mikehush2',
    profilePictureUrl:
      'https://ice-staging.b-cdn.net/profile/default-profile-picture-14.png',
    iceAmount: '613,190',
    checksum: '',
  },
  {
    id: Math.random().toString(),
    username: 'mikehush3',
    profilePictureUrl:
      'https://ice-staging.b-cdn.net/profile/default-profile-picture-14.png',
    iceAmount: '613,190',
    checksum: '',
  },
  {
    id: Math.random().toString(),
    username: 'mikehush4',
    profilePictureUrl:
      'https://ice-staging.b-cdn.net/profile/default-profile-picture-14.png',
    iceAmount: '613,190',
    checksum: '',
  },
  {
    id: Math.random().toString(),
    username: 'mikehush5',
    profilePictureUrl:
      'https://ice-staging.b-cdn.net/profile/default-profile-picture-14.png',
    iceAmount: '613,190',
    checksum: '',
  },
];

export function getTopMiners({query, limit}: Params): Promise<Miner[]> {
  const result = query
    ? TOP_MINERS.filter(m =>
        m.username.toLowerCase().startsWith(query.toLowerCase()),
      )
    : TOP_MINERS;
  return new Promise(r =>
    setTimeout(() => r(limit ? result.slice(0, limit) : result), 1000),
  );
}
