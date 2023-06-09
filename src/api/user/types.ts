// SPDX-License-Identifier: BUSL-1.1

import {SupportedLocale} from '@translations/localeConfig';

export type User = {
  id: string;
  username: string;
  profilePictureUrl: string;

  /**
   * example: 2022-01-03T16:20:52.156534Z
   */
  createdAt: string;

  language: SupportedLocale;

  city?: string | null;
  country?: string | null;

  firstName?: string | null;
  lastName?: string | null;

  email?: string | null;

  phoneNumber?: string | null;
  phoneNumberHash?: string | null;

  profilePicture?: {
    uri: string;
    name: string;
    type: string;
  } | null;
  resetProfilePicture?: boolean | null;

  t1ReferralCount?: number | null;
  t2ReferralCount?: number | null;
  agendaPhoneNumberHashes?: string | null;

  active?: boolean;
  pinged?: boolean | null;

  referralType?: ReferralType;
  referredBy?: string;

  checksum: string;

  hiddenProfileElements?: HiddenProfileElement[] | null;

  clientData?: ClientData | null;

  skipEmailValidation?: boolean | null;
  skipPhoneNumberValidation?: boolean | null;
};

export type ReferralType = 'CONTACTS' | 'T1' | 'T2';
export type AgendaType = 'AGENDA';
export type TeamUserType = ReferralType | AgendaType;

export type HiddenProfileElement =
  | 'globalRank'
  | 'referralCount'
  | 'level'
  | 'role'
  | 'badges';

export type WalkthroughType = 'Home' | 'Team' | 'News';

export type WalkthroughElement = {
  type: WalkthroughType;
  // To be future-proof. If we modify some screens we want to show that walkthrough again.
  // It should be a constant in the code, that we update when/if we change that specific UI.
  version: number;
  finalized: boolean;
};

export type RegistrationProcessFinalizedStep =
  | 'onboarding'
  | 'username'
  | 'referral'
  | 'email'
  | 'iceBonus';

export type ClientData = {
  registrationProcessFinalizedSteps?: RegistrationProcessFinalizedStep[];
  walkthroughProgress?: WalkthroughElement[];
  miningStateTooltipSeen?: string[];
};
