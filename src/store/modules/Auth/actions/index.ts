// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {OAuthProvider} from '@magic-ext/react-native-oauth';
import {createAction} from '@store/utils/actions/createAction';
import {Action} from 'redux';
import {CallEffect, PutEffect} from 'redux-saga/effects';

type SignInResult = {
  userId: string;
  userInfo: {
    email?: string;
    phoneNumber?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
  };
};

const SET_TOKEN = createAction('SET_TOKEN', {
  STATE: token => ({token}),
});

const INIT_USER = createAction('LOAD_USER', {
  STATE: (user: User | null) => ({user}),
});

const FINISH_AUTH = createAction('FINISH_AUTH', {
  START: (data: SignInResult) => data,
  SUCCESS: (result: User) => ({result}),
  FAILED: (errorMessage: string) => ({errorMessage}),
  CLEAR: true,
});

const SIGN_OUT = createAction('SIGN_OUT', {
  START: true,
  SUCCESS: true,
  FAILED: true,
});

const SIGN_IN_EMAIL = createAction('SIGN_IN_EMAIL', {
  START: (email: string) => ({email}),
  SUCCESS: (result: SignInResult) => result,
  FAILED: true,
});

const SIGN_IN_PHONE = createAction('SIGN_IN_PHONE', {
  START: (phone: string) => ({phone}),
  SUCCESS: (result: SignInResult) => result,
  FAILED: true,
});

const SIGN_IN_SOCIAL = createAction('SIGN_IN_SOCIAL', {
  START: (provider: OAuthProvider) => ({provider}),
  SUCCESS: (result: SignInResult) => result,
  FAILED: true,
});

const DELETE_ACCOUNT = createAction('DELETE_ACCOUNT', {
  START: true,
  SUCCESS: true,
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const UPDATE_ACCOUNT = createAction('UPDATE_ACCOUNT', {
  START: (
    userInfo: Partial<User>,
    raceConditionStrategy: (
      user: User,
    ) => Generator<
      PutEffect<Action<unknown>> | CallEffect<unknown>,
      {retry: boolean},
      void
    > = function* () {
      return {retry: true};
    },
  ) => ({
    userInfo,
    raceConditionStrategy,
  }),
  SUCCESS: (user: User, userInfo?: Partial<User>) => ({user, userInfo}),
  FAILED: (errorMessage: string) => ({errorMessage}),
});

export const AuthActions = Object.freeze({
  SET_TOKEN,
  INIT_USER,
  FINISH_AUTH,
  SIGN_IN_EMAIL,
  SIGN_IN_PHONE,
  SIGN_IN_SOCIAL,
  SIGN_OUT,
  DELETE_ACCOUNT,
  UPDATE_ACCOUNT,
});
