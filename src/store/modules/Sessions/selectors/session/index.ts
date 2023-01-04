// SPDX-License-Identifier: BUSL-1.1

import {getDevice} from './getDevice';
import {getLastActivityAt} from './getLastActivityAt';
import {getLocationName} from './getLocationName';
import {getLoginIdentifier} from './getLoginIdentifier';
import {getLoginIdentifierType} from './getLoginIdentifierType';
import {getProviderId} from './getProviderId';
import {getProviderType} from './getProviderType';
import {isAllowedUnlink} from './isAllowedUnlink';
import {isCurrentSession} from './isCurrentSession';

export const SessionSelectors = Object.freeze({
  getDevice,
  getLastActivityAt,
  getLocationName,
  getLoginIdentifier,
  getLoginIdentifierType,
  getProviderId,
  getProviderType,
  isAllowedUnlink,
  isCurrentSession,
});
