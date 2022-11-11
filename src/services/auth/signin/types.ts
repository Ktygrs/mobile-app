// SPDX-License-Identifier: BUSL-1.1

export type SignInUserInfo = {
  userHandle: string | null | undefined;
  firstName: string | null | undefined;
  lastName: string | null | undefined;
};

export type SocialSignInMethod<T> = () => Promise<
  | {
      cancelled: false;
      data: T;
      userInfo: SignInUserInfo;
    }
  | {cancelled: true}
>;

export type SocialSignInProvider = 'apple' | 'google' | 'facebook' | 'twitter';
