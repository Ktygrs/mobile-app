// SPDX-License-Identifier: BUSL-1.1

export const reactStringReplace = (
  source: string | unknown[],
  match: string,
  fn: (match: string, index: number) => void,
): unknown[] => {
  const replace = (src: string) =>
    src
      .split(match)
      .flatMap((part, index) => [part, fn(match, index)])
      .slice(0, -1);

  if (typeof source === 'string') {
    return replace(source);
  } else if (Array.isArray(source)) {
    return source.map(part => reactStringReplace(part, match, fn)).flat();
  }
  return source;
};
