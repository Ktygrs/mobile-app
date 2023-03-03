// SPDX-License-Identifier: BUSL-1.1

import {showWalkThroughSaga} from '@store/modules/WalkThrough/sagas/showWalkThroughSaga';
import {all, fork} from 'redux-saga/effects';

export function* rootWalkthroughSaga() {
  yield all([fork(showWalkThroughSaga)]);
}
