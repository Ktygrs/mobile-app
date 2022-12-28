// SPDX-License-Identifier: BUSL-1.1

import {ENV} from '@constants/env';
import {commonStyles} from '@constants/styles';
import Clipboard from '@react-native-clipboard/clipboard';
import {
  Copied,
  CopiedMethods,
} from '@screens/InviteFlow/InviteShare/components/Copied';
import {
  ShareButton,
  SocialShareButtonType,
  SocialType,
} from '@screens/InviteFlow/InviteShare/components/ShareButton';
import {usernameSelector} from '@store/modules/Account/selectors';
import {t} from '@translations/i18n';
import React, {useRef} from 'react';
import {Share as ShareMore, StyleSheet, Vibration, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Share, {ShareSingleOptions, Social} from 'react-native-share';
import {useSelector} from 'react-redux';
import {rem, screenWidth} from 'rn-units';

const telegramIcon = require('../../assets/images/telegramIcon.png');
const twitterIcon = require('../../assets/images/twitterIcon.png');
const whatsAppIcon = require('../../assets/images/whatsAppIcon.png');
const instagramIcon = require('../../assets/images/instagramIcon.png');
const emailIcon = require('../../assets/images/emailIcon.png');
const fbIcon = require('../../assets/images/newsfeedIcon.png');
const copyIcon = require('../../assets/images/linkIcon.png');
const moreIcon = require('../../assets/images/moreIcon.png');

const buttons: SocialShareButtonType[] = [
  {
    type: 'Telegram',
    title: t('invite_share.telegram'),
    icon: telegramIcon,
  },
  {
    type: 'Twitter',
    title: t('invite_share.twitter'),
    icon: twitterIcon,
  },
  {
    type: 'WhatsApp',
    title: t('invite_share.whatsapp'),
    icon: whatsAppIcon,
  },
  {
    type: 'Instagram',
    title: t('invite_share.instagram'),
    icon: instagramIcon,
  },
  {
    type: 'Email',
    title: t('invite_share.email'),
    icon: emailIcon,
  },
  {
    type: 'FB',
    title: t('invite_share.fb'),
    icon: fbIcon,
    social: Share.Social.FACEBOOK,
  },
  {
    type: 'CopyLink',
    title: t('invite_share.copy_link'),
    icon: copyIcon,
  },
  {
    type: 'More',
    title: t('invite_share.more'),
    icon: moreIcon,
  },
];

const ShareCard = () => {
  const copiedRef = useRef<CopiedMethods>(null);
  const username = useSelector(usernameSelector);
  const {bottom: bottomInset} = useSafeAreaInsets();

  const handleSocialButtonPress = async (type: SocialType) => {
    const baseOptions = {
      message: t('invite_share.share_message'),
      url: t('invite_share.share_url', {username}),
    };
    switch (type) {
      case 'More':
        let moreOptions = {
          ...baseOptions,
          title: `${t('invite_share.share_message')}${t(
            'invite_share.share_url',
            {
              username,
            },
          )}`,
        };
        ShareMore.share(moreOptions);
        break;
      case 'CopyLink':
        Clipboard.setString(t('invite_share.share_full_text'));
        Vibration.vibrate([0, 50]);
        copiedRef.current?.updateVisibleState(true);
        break;
      case 'Telegram':
        let telegramOptions: ShareSingleOptions = {
          social: Social.Telegram,
        };
        await Share.shareSingle(telegramOptions);
        break;
      case 'Twitter':
        let twitterOptions: ShareSingleOptions = {
          ...baseOptions,
          social: Social.Twitter,
        };
        await Share.shareSingle(twitterOptions);
        break;
      case 'WhatsApp':
        let whatsappOptions: ShareSingleOptions = {
          ...baseOptions,
          social: Social.Whatsapp,
        };
        await Share.shareSingle(whatsappOptions);
        break;
      case 'Email':
        let emailOptions: ShareSingleOptions = {
          ...baseOptions,
          social: Social.Email,
        };
        await Share.shareSingle(emailOptions);
        break;
      case 'FB':
        let fbOptions: ShareSingleOptions = {
          ...baseOptions,
          social: Social.Facebook,
        };
        await Share.shareSingle(fbOptions);
        break;
      case 'Instagram':
        //TODO:: replace image
        const instagramOptions = {
          backgroundImage:
            'https://e7.pngegg.com/pngimages/223/378/png-clipart-three-ice-cubes-three-ice-cubes-ice.png',
          attributionURL: t('invite_share.share_url', {username}),
          social: Share.Social.INSTAGRAM_STORIES,
          appId: ENV.FACEBOOK_APP_ID || '',
        };
        await Share.shareSingle(instagramOptions);
        break;

      default:
        break;
    }
  };

  return (
    <View style={[styles.fullCard, {height: rem(283) + bottomInset}]}>
      <Copied ref={copiedRef} />
      <View
        style={[
          styles.shareCard,
          commonStyles.baseSubScreen,
          {height: rem(239) + bottomInset},
        ]}>
        <View style={styles.buttonsContainer}>
          {buttons.map(button => (
            <ShareButton
              button={button}
              key={button.type}
              onPress={handleSocialButtonPress}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullCard: {
    position: 'absolute',
    backgroundColor: 'transparent',
    left: 0,
    bottom: 0,
    width: screenWidth,
  },
  shareCard: {
    width: screenWidth,
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default ShareCard;
