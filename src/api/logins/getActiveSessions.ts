// SPDX-License-Identifier: BUSL-1.1

import {ApiSession} from './types';

interface ActiveSessionsResponse {
  currentSessionId: string;
  sessions: ApiSession[];
}

const MOCKED_DATA: ActiveSessionsResponse = {
  currentSessionId: '1',

  sessions: [
    {
      sessionId: '1',
      providerType: 'GOOGLE',
      loginIdentifier: 'email@email.com',
      loginIdentifierType: 'EMAIL',

      lastActivityAt: new Date().toISOString(),
      locationName: 'Berlin, Germany',

      device: {
        type: 'PHONE',
        info: 'iPhone XS',
      },
    },

    {
      sessionId: '2',
      providerType: 'GOOGLE',
      loginIdentifier: 'email@email.com',
      loginIdentifierType: 'EMAIL',

      lastActivityAt: '2022-10-30T16:35:02.996090946Z',
      locationName: 'London, UK',

      device: {
        type: 'PHONE',
        info: 'iPhone 7 Plus',
      },
    },

    {
      sessionId: '3',
      providerType: 'APPLE',
      loginIdentifier: '+14844731670',
      loginIdentifierType: 'PHONE_NUMBER',

      lastActivityAt: '2022-09-30T16:35:02.996090946Z',
      locationName: 'New York, USA',

      device: {
        type: 'PHONE',
        info: 'iPhone 12 Pro',
      },
    },

    {
      sessionId: '4',
      providerType: 'EMAIL',
      loginIdentifier: 'some4@email.com',
      loginIdentifierType: 'EMAIL',

      lastActivityAt: '2022-11-30T16:35:02.996090946Z',
      locationName: 'Toronto, Canada',

      device: {
        type: 'PHONE',
        info: 'iPhone 14 Pro Max',
      },
    },
  ],
};

export default function getActiveSessions() {
  return new Promise<ActiveSessionsResponse>(resolve => {
    setTimeout(() => {
      resolve(MOCKED_DATA);
    }, 2000);
  });
}
