// SPDX-License-Identifier: BUSL-1.1

export type User = {
  id: string;
  username: string;
  profilePictureUrl: string;

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

  checksum: string;

  hiddenProfileElements?: HiddenProfileElement[] | null;

  clientData?: ClientData | null;
};

export type ReferralType = 'CONTACTS' | 'T0' | 'T1' | 'T2';

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
  | 'username'
  | 'referral'
  | 'email'
  | 'onboarding';

export type ClientData = {
  registrationProcessFinalizedSteps: RegistrationProcessFinalizedStep[];
  walkthroughProgress: WalkthroughElement[];
  //TODO: add whatever else you need here, or change existing if needed.
};
