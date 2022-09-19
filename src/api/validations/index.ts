// SPDX-License-Identifier: BUSL-1.1

import {validateEmail} from './validateEmail';
import {validatePhoneNumber} from './validatePhoneNumber';

export const validations = Object.freeze({
  validateEmail,
  validatePhoneNumber,
});
