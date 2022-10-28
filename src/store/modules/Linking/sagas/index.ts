// SPDX-License-Identifier: BUSL-1.1

import {LinkingActions} from '@store/modules/Linking/actions';
import {all, takeLatest} from 'redux-saga/effects';

import {handleUrlSaga} from './handleUrlSaga';

export function* rootLinkingSaga() {
  yield all([takeLatest(LinkingActions.HANDLE_URL.STATE.type, handleUrlSaga)]);
}
