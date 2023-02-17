// SPDX-License-Identifier: BUSL-1.1

import {ENV} from '@constants/env';
import {t} from '@translations/i18n';

export const LINKS = {
  APP_STORE: `https://apps.apple.com/app/${ENV.APPSTORE_APP_ID}`,
  PLAY_STORE: `https://play.google.com/store/apps/details?id=${ENV.APP_ID}`,
  PRE_STAKING: t('links.pre_staking'),
  PRIVACY: t('links.privacy'),
  TERMS: t('links.terms'),
  MAIN: t('links.main'),
  BLOCK_EXPLORER: ENV.BLOCK_EXPLORER_URL,
  FIREBASE_NOTICE: 'https://ice.io/firebase-notice',
  KNOWLEDGE_BASE: 'https://ice.io/knowledge-base',
  BONUSES: 'https://ice.io/bonuses',
  FEEDBACK_EMAIL: 'hi@ice.io',
};
