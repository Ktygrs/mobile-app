// SPDX-License-Identifier: BUSL-1.1

const PLURALIZATION_KEYS = ['zero', 'one', 'few', 'many', 'other'];

export const isPluralizationNode = node => {
  if (typeof node !== 'object') {
    return false;
  }
  return Object.keys(node).every(
    key => PLURALIZATION_KEYS.includes(key) && typeof node[key] === 'string',
  );
};
