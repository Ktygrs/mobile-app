// SPDX-License-Identifier: BUSL-1.1

const totalMax = 500;
export const MOCK_TOTAL_USERS_GRAPH_DATA = Array(30)
  .fill(null)
  .map((_, i) => ({
    label: `${i + 1}/03`,
    value: Math.round(Math.random() * totalMax),
  }))
  .reverse();

const activeMax = 100;
export const MOCK_ACTIVE_USERS_GRAPH_DATA = Array(30)
  .fill(null)
  .map((_, i) => ({
    label: `${i + 1}/03`,
    value: Math.round(Math.random() * activeMax),
  }))
  .reverse();
