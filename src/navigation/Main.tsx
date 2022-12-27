// SPDX-License-Identifier: BUSL-1.1

import {BadgeCategory} from '@api/badges/types';
import {Country} from '@constants/countries';
import {MainTabBar} from '@navigation/components/MainTabBar';
import {HomeIcon} from '@navigation/components/MainTabBar/components/Icons/HomeIcon';
import {NewsIcon} from '@navigation/components/MainTabBar/components/Icons/NewsIcon';
import {ProfileIcon} from '@navigation/components/MainTabBar/components/Icons/ProfileIcon';
import {TeamIcon} from '@navigation/components/MainTabBar/components/Icons/TeamIcon';
import {useUpdateRequiredListener} from '@navigation/hooks/useUpdateRequiredListener';
import {modalOptions, screenOptions, tabOptions} from '@navigation/options';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ActiveSessions from '@screens/ActiveSessions';
import {ActionSheet} from '@screens/Dialogs/ActionSheet';
import {Confirm, ConfirmButton} from '@screens/Dialogs/Confirm';
import {CountrySelect} from '@screens/Dialogs/CountrySelect';
import {DateSelect} from '@screens/Dialogs/DateSelector';
import {BalanceHistory} from '@screens/HomeFlow/BalanceHistory';
import {Home} from '@screens/HomeFlow/Home';
import {Stats} from '@screens/HomeFlow/Stats';
import {TopCountries} from '@screens/HomeFlow/TopCountries';
import {TopMiners} from '@screens/HomeFlow/TopMiners';
import {UserGrowthGraph} from '@screens/HomeFlow/UserGrowthGraph';
import {ImageView} from '@screens/ImageView';
import {InviteFriend} from '@screens/InviteFlow/InviteFriend';
import {InviteShare} from '@screens/InviteFlow/InviteShare';
import {News} from '@screens/News';
import {Notifications} from '@screens/Notifications';
import {ContextualMenu} from '@screens/PopUps/ContextualMenu';
import {ErrorPopUp} from '@screens/PopUps/Error';
import {ProfilePrivacyEditStep1} from '@screens/PopUps/ProfilePrivacyEdit/step1';
import {ProfilePrivacyEditStep2} from '@screens/PopUps/ProfilePrivacyEdit/step2';
import {ProfilePrivacyEditStep3} from '@screens/PopUps/ProfilePrivacyEdit/step3';
import {Tooltip} from '@screens/PopUps/Tooltip';
import {UpdateRequired} from '@screens/PopUps/UpdateRequired';
import {UpdateSuccessful} from '@screens/PopUps/UpdateSuccessful';
import {Badges} from '@screens/ProfileFlow/Badges';
import {Profile} from '@screens/ProfileFlow/Profile';
import {Roles} from '@screens/ProfileFlow/Roles';
import {ConfirmEmail} from '@screens/SettingsFlow/ConfirmEmail';
import {ConfirmPhoneNumber} from '@screens/SettingsFlow/ConfirmPhoneNumber';
import {LanguageSettings} from '@screens/SettingsFlow/LanguageSettings';
import {ModifyEmail} from '@screens/SettingsFlow/ModifyEmail';
import {ModifyPhoneNumber} from '@screens/SettingsFlow/ModifyPhoneNumber';
import {NotificationSettings} from '@screens/SettingsFlow/NotificationSettings';
import {PersonalInformation} from '@screens/SettingsFlow/PersonalInformation';
import {Settings} from '@screens/SettingsFlow/Settings';
import {Staking} from '@screens/Staking';
import {Team} from '@screens/Team';
import {WebView} from '@screens/WebView';
import {StatsPeriod} from '@store/modules/Stats/types';
import React, {ComponentType, RefObject} from 'react';
import {Image, View} from 'react-native';
import {Contact} from 'react-native-contacts';
import Animated from 'react-native-reanimated';
import {SvgProps} from 'react-native-svg';

export type MainTabsParamList = {
  HomeTab: undefined;
  TeamTab: undefined;
  NewsTab: undefined;
  ProfileTab: undefined;
};

export type MainStackParamList = {
  MainTabs: undefined;
  WebView: {
    url: string;
    title?: string;
  };
  Confirm: {
    title?: string;
    subtitle?: string;
    buttons?: ConfirmButton[];
  };
  Tooltip: {
    position: 'above' | 'below';
    targetRef: RefObject<View>;
    TargetComponent: ComponentType<unknown>;
    DescriptionComponent: ComponentType<unknown>;
    targetCircleSize?: number;
    descriptionOffset?: number;
  };
  Staking: undefined;
  ImageView: {
    imageRef: RefObject<Image | Animated.Image>;
    uri: string;
    size: number;
    borderRadius?: number;
  };
  ActionSheet: {
    title: string;
    buttons: {
      icon: (props: SvgProps) => JSX.Element;
      label: string;
      onPress: () => void;
    }[];
  };
  DateSelect: {
    onSelect: (range: {start: string | null; end: string | null}) => void;
  };
  UpdateRequired: undefined;
  UpdateSuccessful: undefined;
  ErrorPopUp: {
    message: string;
  };
  InviteFriend: {contact: Contact};
  InviteShare: undefined;
  ContextualMenu: {
    coords: {top?: number; right?: number; bottom?: number; left?: number};
    buttons: {
      icon?: (props: SvgProps) => JSX.Element;
      label: string;
      onPress: () => void;
    }[];
    onClose?: () => void;
  };
  Notifications: undefined;
  CountrySelect: {
    onSelect: (country: Country) => void;
  };
  UserProfile: {userId: string} | undefined;
  Roles: {userId?: string} | undefined;
  Badges: {category?: BadgeCategory; userId?: string};
  ProfilePrivacyEditStep1: undefined;
  ProfilePrivacyEditStep2: undefined;
  ProfilePrivacyEditStep3: undefined;

  ActiveSessions: undefined;
};

export type HomeTabStackParamList = {
  Home: undefined;
  Stats: undefined;
  TopMiners: undefined;
  TopCountries: undefined;
  InviteShare: undefined;
  UserGrowthGraph: {
    category: 'active' | 'total';
    statsPeriod: StatsPeriod;
  };
  BalanceHistory: undefined;
};

export type TeamTabStackParamList = {
  Team: undefined;
};

export type ProfileTabStackParamList = {
  MyProfile: undefined;
  Roles: {userId?: string} | undefined;
  Badges: {category?: BadgeCategory; userId?: string};
  Settings: undefined;
  PersonalInformation: undefined;
  ModifyPhoneNumber: undefined;
  ConfirmPhoneNumber: undefined;
  NotificationSettings: undefined;
  LanguageSettings: undefined;
  ModifyEmail: undefined;
  ConfirmEmail: undefined;
};

export type MainNavigationParams = MainTabsParamList &
  MainStackParamList &
  ProfileTabStackParamList &
  TeamTabStackParamList &
  HomeTabStackParamList;

const Tabs = createBottomTabNavigator<MainTabsParamList>();
const MainStack = createNativeStackNavigator<MainStackParamList>();
const HomeTabStack = createNativeStackNavigator<HomeTabStackParamList>();
const TeamTabStack = createNativeStackNavigator<TeamTabStackParamList>();
const ProfileTabStack = createNativeStackNavigator<ProfileTabStackParamList>();

/**
 * Needs to be on Badges screen to enable swipe to go back over PagerView
 * Note: patches/react-native-screens.patch is also a part of the fix
 */
const badgesOptions = {fullScreenGestureEnabled: true};

const HomeTabStackNavigator = () => (
  <HomeTabStack.Navigator screenOptions={screenOptions}>
    <HomeTabStack.Screen name="Home" component={Home} />
    <HomeTabStack.Screen name="Stats" component={Stats} />
    <HomeTabStack.Screen name="TopMiners" component={TopMiners} />
    <HomeTabStack.Screen name="TopCountries" component={TopCountries} />
    <HomeTabStack.Screen name="UserGrowthGraph" component={UserGrowthGraph} />
    <HomeTabStack.Screen name="BalanceHistory" component={BalanceHistory} />
  </HomeTabStack.Navigator>
);

const ProfileTabStackNavigator = () => (
  <ProfileTabStack.Navigator screenOptions={screenOptions}>
    <ProfileTabStack.Screen name="MyProfile" component={Profile} />
    <ProfileTabStack.Screen name="Roles" component={Roles} />
    <ProfileTabStack.Screen
      name="Badges"
      component={Badges}
      options={badgesOptions}
    />
    <ProfileTabStack.Screen name="Settings" component={Settings} />
    <ProfileTabStack.Screen
      name="PersonalInformation"
      component={PersonalInformation}
    />
    <ProfileTabStack.Screen
      name="ModifyPhoneNumber"
      component={ModifyPhoneNumber}
    />
    <ProfileTabStack.Screen
      name="ConfirmPhoneNumber"
      component={ConfirmPhoneNumber}
    />
    <ProfileTabStack.Screen
      name="NotificationSettings"
      component={NotificationSettings}
    />
    <ProfileTabStack.Screen
      name="LanguageSettings"
      component={LanguageSettings}
    />
    <ProfileTabStack.Screen name="ModifyEmail" component={ModifyEmail} />
    <ProfileTabStack.Screen name="ConfirmEmail" component={ConfirmEmail} />
  </ProfileTabStack.Navigator>
);

const TeamTabStackNavigator = () => {
  return (
    <TeamTabStack.Navigator screenOptions={screenOptions}>
      <TeamTabStack.Screen name="Team" component={Team} />
    </TeamTabStack.Navigator>
  );
};

const MainTabBarComponent = (props: BottomTabBarProps) => (
  <MainTabBar {...props} />
);

const MainTabs = () => (
  <Tabs.Navigator screenOptions={tabOptions} tabBar={MainTabBarComponent}>
    <Tabs.Screen
      name="HomeTab"
      component={HomeTabStackNavigator}
      options={{tabBarIcon: HomeIcon}}
    />
    <Tabs.Screen
      name="TeamTab"
      component={TeamTabStackNavigator}
      options={{tabBarIcon: TeamIcon}}
    />
    <Tabs.Screen
      name="NewsTab"
      component={News}
      options={{tabBarIcon: NewsIcon}}
    />
    <Tabs.Screen
      name="ProfileTab"
      component={ProfileTabStackNavigator}
      options={{tabBarIcon: ProfileIcon}}
    />
  </Tabs.Navigator>
);

export function MainNavigator() {
  useUpdateRequiredListener();
  return (
    <MainStack.Navigator screenOptions={screenOptions}>
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen
        name="WebView"
        options={modalOptions}
        component={WebView}
      />
      <MainStack.Screen
        name="Confirm"
        options={modalOptions}
        component={Confirm}
      />
      <MainStack.Screen
        name="Tooltip"
        options={modalOptions}
        component={Tooltip}
      />
      <MainStack.Screen
        name="ImageView"
        options={modalOptions}
        component={ImageView}
      />
      <MainStack.Screen
        name="ActionSheet"
        options={modalOptions}
        component={ActionSheet}
      />
      <MainStack.Screen
        name="DateSelect"
        options={modalOptions}
        component={DateSelect}
      />
      <MainStack.Screen name="Staking" component={Staking} />
      <MainStack.Screen
        name="UpdateRequired"
        component={UpdateRequired}
        options={modalOptions}
      />
      <MainStack.Screen
        name="UpdateSuccessful"
        component={UpdateSuccessful}
        options={modalOptions}
      />
      <MainStack.Screen
        name="ErrorPopUp"
        component={ErrorPopUp}
        options={modalOptions}
      />
      <MainStack.Screen
        name="InviteFriend"
        component={InviteFriend}
        options={modalOptions}
      />
      <MainStack.Screen
        name="InviteShare"
        component={InviteShare}
        options={modalOptions}
      />
      <MainStack.Screen
        name="ContextualMenu"
        component={ContextualMenu}
        options={modalOptions}
      />
      <MainStack.Screen name="Notifications" component={Notifications} />
      <MainStack.Screen
        name="CountrySelect"
        component={CountrySelect}
        options={{
          presentation: 'modal',
        }}
      />
      <MainStack.Screen name="UserProfile" component={Profile} />
      <MainStack.Screen name="Roles" component={Roles} />
      <MainStack.Screen
        name="Badges"
        component={Badges}
        options={badgesOptions}
      />
      <MainStack.Screen
        name="ProfilePrivacyEditStep1"
        component={ProfilePrivacyEditStep1}
        options={modalOptions}
      />
      <MainStack.Screen
        name="ProfilePrivacyEditStep2"
        component={ProfilePrivacyEditStep2}
        options={modalOptions}
      />
      <MainStack.Screen
        name="ProfilePrivacyEditStep3"
        component={ProfilePrivacyEditStep3}
        options={modalOptions}
      />

      <MainStack.Screen name="ActiveSessions" component={ActiveSessions} />
    </MainStack.Navigator>
  );
}
