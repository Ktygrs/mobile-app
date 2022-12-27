// SPDX-License-Identifier: BUSL-1.1

import getDevice from './getDevice';
import getLastActivityAt from './getLastActivityAt';
import getLocationName from './getLocationName';
import getLoginIdentifier from './getLoginIdentifier';
import getLoginIdentifierType from './getLoginIdentifierType';
import getProviderType from './getProviderType';
import isCurrentSession from './isCurrentSession';

export default Object.freeze({
  getDevice,
  getLastActivityAt,
  getLocationName,
  getLoginIdentifier,
  getLoginIdentifierType,
  getProviderType,
  isCurrentSession,
});
