// SPDX-License-Identifier: BUSL-1.1

import {ENV} from '@constants/env';
import {navigate, navigationRef} from '@navigation/utils';
import {logError} from '@services/logging';
import {LinkingActions} from '@store/modules/Linking/actions';
import {Linking} from 'react-native';

const QueryString = require('query-string');
const Parser = require('url-parse');

const actionCreator = LinkingActions.HANDLE_URL.STATE.create;

export function* handleUrlSaga(action: ReturnType<typeof actionCreator>) {
  const {urlToParse} = action.payload;

  if (!urlToParse || !navigationRef) {
    return;
  }

  const {pathname, isDeeplink, url} = parseUrl(urlToParse);

  switch (pathname) {
    case 'users':
    case 'pinged':
      //TODO: Navigate to user profile screen, not own profile
      navigate({name: 'ProfileTab', params: undefined});
      break;
    case 'browser':
      navigate({
        name: 'WebView',
        params: {
          url: url,
        },
      });
      break;
    case 'followUs':
    case 'refJoined':
    case 'announcements':
      navigate({name: 'WebView', params: {url: urlToParse}});
      break;
    case 'mining':
      navigate({name: 'HomeTab', params: undefined});
      break;
    case 'staking':
      navigate({name: 'HomeTab', params: undefined});
      break;
    case 'weeklyStats':
      navigate({name: 'Stats', params: undefined});
      break;
    case 'inviteFriends':
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
      navigate({name: 'MyRoles', params: undefined});
      break;
    case 'badge':
      navigate({name: 'MyBadges', params: undefined}); //TODO: focus on badge
      break;
    case 'task':
      navigate({name: 'HomeTab', params: undefined}); //TODO: focus on the task
      break;
    case 'adoption':
      navigate({name: 'HomeTab', params: undefined}); //TODO: focus on adoption card
      break;
    case 'loginLinked':
      navigate({name: 'Settings', params: undefined});
      break;
    default:
      return (
        !isDeeplink &&
        Linking.openURL(urlToParse).catch(error => logError(error))
      );
  }
}

const parseUrl = (url: string) => {
  const parsed = new Parser(url, true);
  const isDeeplink = parsed.protocol.includes(ENV.DEEPLINKING_PREFIX);

  let params;
  if (isDeeplink) {
    const urlWithParams = url.split('?')?.[1];
    if (urlWithParams) {
      params = QueryString.parse(urlWithParams);
    }
  }

  const paths = parsed.pathname?.split('/')?.filter((i: string) => i!!);
  return {
    query: parsed.query,
    pathname: isDeeplink ? parsed.host : paths[0],
    isDeeplink,
    ...params,
  };
};
