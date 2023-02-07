// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {userSelector} from '@store/modules/Account/selectors';
import {deviceSettingsSelector} from '@store/modules/Devices/selectors';
import {NewsActions} from '@store/modules/News/actions';
import {appLocale} from '@translations/i18n';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* loadUnreadNewsCountSaga() {
  const deviceSettings: SagaReturnType<typeof deviceSettingsSelector> =
    yield select(deviceSettingsSelector);

  const user: SagaReturnType<typeof userSelector> = yield select(userSelector);

  try {
    const {count}: SagaReturnType<typeof Api.news.getUnreadNewsCount> =
      yield call(Api.news.getUnreadNewsCount, {
        language: deviceSettings?.language ?? appLocale,
        createdAfter: user?.createdAt,
      });

    yield put(
      NewsActions.UNREAD_NEWS_COUNT_LOAD.SUCCESS.create({
        count,
      }),
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    yield put(NewsActions.UNREAD_NEWS_COUNT_LOAD.FAILED.create(errorMessage));

    throw error;
  }
}
