// SPDX-License-Identifier: BUSL-1.1

export type LoginProvider =
  | 'APPLE'
  | 'EMAIL'
  | 'FACEBOOK'
  | 'GOOGLE'
  | 'PHONE'
  | 'TWITTER';

export type LoginSession = {
  sessionId: string;

  providerId: string;
  providerType: LoginProvider;

  loginIdentifier: string;
  loginIdentifierType: 'EMAIL' | 'PHONE_NUMBER';

  lastActivityAt: string; // "2022-11-30T16:35:02.996090946Z"
  locationName: string;

  deviceUniqueId: string;
  device: {
    type: 'PHONE';
    info: string;
  };
};
