// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {deviceSettingsSelector} from '@store/modules/Devices/selectors';
import {NewsActions} from '@store/modules/News/actions';
import {appLocale} from '@translations/i18n';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

const actionCreator = NewsActions.NEWS_ARTICLE_MARK_VIEWED(null).START.create;

export function* markViewedNewsArticleSaga(
  action: ReturnType<typeof actionCreator>,
) {
  const {newsId} = action.payload;

  const deviceSettings: SagaReturnType<typeof deviceSettingsSelector> =
    yield select(deviceSettingsSelector);

  try {
    yield call(Api.news.markViewed, {
      language: deviceSettings?.language ?? appLocale,
      newsId,
    });

    yield put(
      NewsActions.NEWS_ARTICLE_MARK_VIEWED(action.id).SUCCESS.create({
        newsId,
      }),
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    yield put(
      NewsActions.NEWS_ARTICLE_MARK_VIEWED(action.id).FAILED.create(
        errorMessage,
      ),
    );

    throw error;
  }
}
