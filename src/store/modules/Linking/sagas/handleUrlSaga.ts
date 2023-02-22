// SPDX-License-Identifier: BUSL-1.1

import {ENV} from '@constants/env';
import {navigate} from '@navigation/utils';
import {isSignInWithEmailLink, isUpdateEmailLink} from '@services/auth';
import {logError} from '@services/logging';
import {AccountActions} from '@store/modules/Account/actions';
import {LinkingActions} from '@store/modules/Linking/actions';
import {openLinkWithInAppBrowser} from '@utils/device';
import {Linking} from 'react-native';
import {put} from 'redux-saga/effects';
import Url from 'url-parse';

const actionCreator = LinkingActions.HANDLE_URL.STATE.create;

export function* handleUrlSaga(action: ReturnType<typeof actionCreator>) {
  const {url, handledInApp} = action.payload;

  if (isSignInWithEmailLink(url)) {
    yield put(AccountActions.SIGN_IN_EMAIL.CONFIRM_TEMP_EMAIL.create(url));
    return;
  }

  /** User updated email:
   * this action requires force logout because firebase
   * auth token expires immediately (a major account change)
   * https://firebase.google.com/docs/auth/admin/manage-sessions
   */

  const {path, query, isDeeplink, isUniversalLink} = parseUrl(url);

  if (isUpdateEmailLink(query)) {
    yield put(
      AccountActions.VERIFY_BEFORE_UPDATE_EMAIL.CONFIRM_TEMP_EMAIL.create(url),
    );
    return;
  }

  switch (path.toLowerCase()) {
    case 'users':
    case 'pinged':
      // TODO: temp profile disabling
      false &&
        navigate({
          name: 'UserProfile',
          params: {userId: query.id ?? ''},
        });
      break;
    case 'browser':
      openLinkWithInAppBrowser({url: query.url ?? ''});
      break;
    case 'followus':
    case 'refjoined':
    case 'announcements':
      openLinkWithInAppBrowser({url});
      break;
    case 'mining':
      navigate({name: 'HomeTab', params: undefined});
      break;
    case 'staking':
      navigate({name: 'HomeTab', params: undefined});
      break;
    case 'weeklystats':
      navigate({name: 'Stats', params: undefined});
      break;
    case 'invitefriends':
      navigate({name: 'InviteShare', params: undefined});
      break;
    case 'joined':
      navigate({name: 'TeamTab', params: undefined});
      break;
    case 'news':
      navigate({name: 'NewsTab', params: undefined});
      break;
    case 'level':
      navigate({name: 'ProfileTab', params: undefined});
      break;
    case 'role':
      navigate({name: 'Roles', params: {userId: ''}});
      break;
    case 'badge':
      navigate({name: 'Badges', params: {userId: ''}}); //TODO: focus on badge
      break;
    case 'task':
      navigate({name: 'HomeTab', params: undefined}); //TODO: focus on the task
      break;
    case 'adoption':
      navigate({name: 'HomeTab', params: undefined}); //TODO: focus on adoption card
      break;
    case 'loginlinked':
      navigate({name: 'Settings', params: undefined});
      break;
    default:
      if (!handledInApp) {
        if (!isDeeplink && !isUniversalLink) {
          Linking.openURL(url).catch(logError);
        } else {
          logError(`Unable to handle deeplink: ${url}`);
        }
      }
  }
}

const parseUrl = (url: string) => {
  const parsed = new Url(url, true);
  const isDeeplink = parsed.protocol.includes(ENV.DEEPLINK_SCHEME ?? '');
  const isUniversalLink = parsed.host === ENV.DEEPLINK_DOMAIN;
  const path = isDeeplink ? parsed.host : parsed.pathname.replace('/', '');
  return {isDeeplink, isUniversalLink, path, ...parsed};
};
