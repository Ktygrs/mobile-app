// SPDX-License-Identifier: BUSL-1.1

export type NotificationChannel = {
  email: boolean;
  inApp: boolean;
  push: boolean;
  sms: boolean;
};

export type NotificationSettings = {
  [key: string]: NotificationChannel;
};

export interface DeviceSettings extends DeviceId {
  disableAllNotifications: boolean;
  language: string;
  notificationSettings: NotificationSettings;
}

export interface DeviceLocation {
  city: string;
  country: string;
}

export interface DeviceMetadata extends DeviceId {
  apiLevel: number;
  baseOS: string | null;
  bootloader: string | null;
  brand: string | null;
  buildId: string;
  carrier: string | null;
  codename: string | null;
  device: string | null;
  deviceId: string;
  deviceName: string | null;
  deviceType: string | null;
  emulator: boolean;
  fingerprint: string | null;
  firstInstallTime: number;
  hardware: string | null;
  installerPackageName: string | null;
  instanceId: string | null;
  lastUpdateTime: number;
  manufacturer: string | null;
  pinOrFingerprintSet: boolean;
  product: string | null;
  pushNotificationToken: string | null;
  readableVersion: string | null;
  systemName: string | null;
  systemVersion: string | null;
  tablet: boolean;
  tags: string | null;
  type: string | null;
  userAgent: string | null;
}

export interface DeviceId {
  userId: string;
  deviceUniqueId: string;
}
