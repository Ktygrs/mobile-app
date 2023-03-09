// SPDX-License-Identifier: BUSL-1.1

import {showWalkthroughSaga} from '@store/modules/Walkthrough/sagas/showWalkthroughSaga';
import {all, fork} from 'redux-saga/effects';

export function* rootWalkthroughSaga() {
  yield all([fork(showWalkthroughSaga)]);
}
