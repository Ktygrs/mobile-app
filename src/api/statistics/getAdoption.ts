// SPDX-License-Identifier: BUSL-1.1

import {get} from '@api/client';
import {Adoption} from '@api/statistics/types';

export function getAdoption() {
  return get<Adoption>('/tokenomics-statistics/adoption');
}
