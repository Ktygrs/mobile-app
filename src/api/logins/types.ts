// SPDX-License-Identifier: BUSL-1.1

export type ApiLoginProvider =
  | 'EMAIL'
  | 'APPLE'
  | 'FACEBOOK'
  | 'TWITTER'
  | 'GOOGLE';

export type ApiSession = {
  sessionId: string;

  providerId: string;
  providerType: ApiLoginProvider;

  loginIdentifier: string;
  loginIdentifierType: 'EMAIL' | 'PHONE_NUMBER';

  lastActivityAt: string; // "2022-11-30T16:35:02.996090946Z"
  locationName: string;

  device: {
    type: 'PHONE';
    info: string;
  };
};
