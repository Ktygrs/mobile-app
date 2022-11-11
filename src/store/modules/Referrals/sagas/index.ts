// SPDX-License-Identifier: BUSL-1.1

import {ReferralsActions} from '@store/modules/Referrals/actions';
import {getReferralsHistorySaga} from '@store/modules/Referrals/sagas/getReferralsHistorySaga';
import {getReferralsSaga} from '@store/modules/Referrals/sagas/getReferralsSaga';
import {takeLeadingEveryUnique} from '@store/utils/sagas/effects';
import {all, takeLeading} from 'redux-saga/effects';

export function* rootReferralsSaga() {
  yield all([
    takeLeadingEveryUnique(
      ReferralsActions.GET_REFERRALS({})(null).START.type,
      getReferralsSaga,
    ),
    takeLeading(
      ReferralsActions.GET_REFERRALS_HISTORY.START.type,
      getReferralsHistorySaga,
    ),
  ]);
}
