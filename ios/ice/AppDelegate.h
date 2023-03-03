// SPDX-License-Identifier: BUSL-1.1

#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import <UserNotifications/UNUserNotificationCenter.h>
#import <FirebaseMessaging.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate, FIRMessagingDelegate>

@property (nonatomic, strong) UIWindow *window;

// add this line to the @interface section of AppDelegate
@property (nonatomic, strong) NSString *moeDeeplink;

@end