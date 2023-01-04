// SPDX-License-Identifier: BUSL-1.1

import {LoginSession} from './types';

interface ActiveLoginSessionsResponse {
  currentSessionId: string;
  sessions: LoginSession[];
}

const MOCKED_DATA: ActiveLoginSessionsResponse = {
  currentSessionId: '1',

  sessions: [
    {
      sessionId: '1',

      providerId: 'GOOGLE_id',
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

      providerId: 'GOOGLE_id',
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

      providerId: 'APPLE_id',
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

      providerId: 'EMAIL_id',
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

    {
      sessionId: '5',

      providerId: 'PHONE_id',
      providerType: 'PHONE',

      loginIdentifier: '+380669966999',
      loginIdentifierType: 'PHONE_NUMBER',

      lastActivityAt: '2022-10-25T16:35:02.996090946Z',
      locationName: 'Toronto, Canada',

      device: {
        type: 'PHONE',
        info: 'iPhone 14 Pro Max',
      },
    },

    {
      sessionId: '6',

      providerId: 'APPLE_id',
      providerType: 'APPLE',

      loginIdentifier: '+14844731670',
      loginIdentifierType: 'PHONE_NUMBER',

      lastActivityAt: '2022-01-30T16:35:02.996090946Z',
      locationName: 'New York, USA',

      device: {
        type: 'PHONE',
        info: 'iPhone 12 Pro',
      },
    },
  ],
};

export function getActiveLoginSessions() {
  return new Promise<ActiveLoginSessionsResponse>(resolve => {
    setTimeout(() => {
      resolve(MOCKED_DATA);
    }, 2000);
  });
}
