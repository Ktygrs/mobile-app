// SPDX-License-Identifier: BUSL-1.1

#import "FirebaseNotificationService.h"
#import "FirebaseMessaging.h"
@import MoEngageRichNotification;

@interface FirebaseNotificationService ()

@property (nonatomic, strong) void (^contentHandler)(UNNotificationContent *contentToDeliver);
@property (nonatomic, strong) UNMutableNotificationContent *bestAttemptContent;

@end

@implementation FirebaseNotificationService

- (void)didReceiveNotificationRequest:(UNNotificationRequest *)request withContentHandler:(void (^)(UNNotificationContent * _Nonnull))contentHandler {
    self.contentHandler = contentHandler;
    self.bestAttemptContent = [request.content mutableCopy];
    if ([request.content.userInfo objectForKey:@"moengage"]) {
      [MoEngageSDKRichNotification setAppGroupID: @"group.io.ice"];
      [MoEngageSDKRichNotification handleWithRichNotificationRequest:request withContentHandler:contentHandler];
    } else {
      [[FIRMessaging extensionHelper] populateNotificationContent:self.bestAttemptContent withContentHandler:contentHandler];
    }
}

- (void)serviceExtensionTimeWillExpire {
    // Called just before the extension will be terminated by the system.
    // Use this as an opportunity to deliver your "best attempt" at modified content, otherwise the original push payload will be used.
    self.contentHandler(self.bestAttemptContent);
}

@end
