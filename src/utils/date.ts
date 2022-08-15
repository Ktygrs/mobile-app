// SPDX-License-Identifier: BUSL-1.1

export const hoursDiff = (dateA: string | Date, dateB: string | Date) => {
  const a = dateA instanceof Date ? dateA : new Date(dateA);
  const b = dateB instanceof Date ? dateB : new Date(dateB);

  const diff = (a.getTime() - b.getTime()) / 3.6e6;
  return Math.floor(diff);
};
