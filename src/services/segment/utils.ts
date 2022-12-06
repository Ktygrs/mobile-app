// SPDX-License-Identifier: BUSL-1.1

export function getPageName(
  routeName: string,
  parentRouteName?: string,
): string {
  switch (routeName) {
    case 'Profile':
      return 'Profile';
    case 'Roles':
      return `${parentRouteName}/Roles`;
    case 'Badges':
      return `${parentRouteName}/Badges`;
    case 'InviteFriends':
      return 'Invite Friends';
  }
  return '';
}

export async function getPageNameAndProperties({
  routName,
  parentRouteName,
  params,
}: {
  routName: string;
  parentRouteName?: string;
  params: Record<string, unknown>;
}): Promise<{pageName: string; props: {[key: string]: unknown}}> {
  const pageName = getPageName(routName, parentRouteName);
  try {
    switch (pageName) {
      case 'Profile': {
        const {userId} = params;
        return {
          pageName,
          props: {
            'Profile User ID': userId ?? 'N/A',
          },
        };
      }

      case 'Invite Friends': {
        const {screenSource} = params;
        const source = getPageName(String(screenSource));
        return {
          pageName,
          props: {
            Source: source,
          },
        };
      }
    }
  } catch {}
  return {pageName: '', props: {}};
}
