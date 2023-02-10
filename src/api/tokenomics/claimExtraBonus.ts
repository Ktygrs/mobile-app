// SPDX-License-Identifier: BUSL-1.1

import {post} from '@api/client';

interface Params {
  userId: string;
}

export function claimExtraBonus({userId}: Params) {
  return post<null, {availableExtraBonus: number}>(
    `/tokenomics/${userId}/extra-bonus-claims`,
    null,
  );
}
