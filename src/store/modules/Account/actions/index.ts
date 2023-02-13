// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {
  SignInUserInfo,
  SocialSignInProvider,
} from '@services/auth/signin/types';
import {createAction} from '@store/utils/actions/createAction';
import {Action} from 'redux';
import {CallEffect, PutEffect} from 'redux-saga/effects';

const SET_TOKEN = createAction('SET_TOKEN', {
  STATE: (token: string | null) => ({token}),
});

const SYNC_LANGUAGE_CODE = createAction('SYNC_LANGUAGE_CODE', {
  STATE: true,
});

const USER_STATE_CHANGE = createAction('USER_STATE_CHANGE', {
  START: true,
  SUCCESS: (user: User | null, isAdmin: boolean | null) => ({user, isAdmin}),
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const SIGN_OUT = createAction('SIGN_OUT', {
  START: true,
  SUCCESS: true,
  FAILED: true,
});

const SIGN_IN_EMAIL = createAction('SIGN_IN_EMAIL', {
  START: (email: string) => ({email}),
  SET_TEMP_EMAIL: (email: string) => ({email}),
  CONFIRM_TEMP_EMAIL: (link: string) => ({link}),
  SUCCESS: true,
  FAILED: (errorMessage: string) => ({errorMessage}),
  RESET: true,
});

const SIGN_IN_PHONE = createAction('SIGN_IN_PHONE', {
  START: (phoneNumber: string) => ({phoneNumber}),
  SET_TEMP_PHONE: (phoneNumber: string) => ({phoneNumber}),
  RESEND: true,
  RESEND_SUCCESS: true,
  CONFIRM_TEMP_PHONE: (code: string) => ({code}),
  SUCCESS: true,
  FAILED: (errorMessage: string) => ({errorMessage}),
  CLEAR_ERROR: true,
  RESET: true,
});

const SIGN_IN_SOCIAL = createAction('SIGN_IN_SOCIAL', {
  START: (provider: SocialSignInProvider) => ({
    provider,
  }),
  SUCCESS: (userInfo: SignInUserInfo) => ({userInfo}),
  FAILED: (errorMessage: string) => ({errorMessage}),
  CLEAR: true,
});

const DELETE_ACCOUNT = createAction('DELETE_ACCOUNT', {
  START: true,
  SUCCESS: true,
  FAILED: true,
});

const UPDATE_REF_BY_USERNAME = createAction('UPDATE_REF_BY_USERNAME', {
  START: (refUsername: string) => ({refUsername}),
  SUCCESS: (user: User) => ({user}),
  FAILED: (errorMessage: string) => ({errorMessage}),
  CLEAR: false,
  RESET: true,
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
  RESET: true,
});

const GET_ACCOUNT = createAction('GET_ACCOUNT', {
  START: true,
  SUCCESS: (user: User) => ({user}),
  FAILED: (errorMessage: string) => ({errorMessage}),
});

export const AccountActions = Object.freeze({
  SET_TOKEN,
  SYNC_LANGUAGE_CODE,
  SIGN_IN_EMAIL,
  SIGN_IN_PHONE,
  SIGN_IN_SOCIAL,
  SIGN_OUT,
  DELETE_ACCOUNT,
  UPDATE_REF_BY_USERNAME,
  UPDATE_ACCOUNT,
  GET_ACCOUNT,
  USER_STATE_CHANGE,
});
