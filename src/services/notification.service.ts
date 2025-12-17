import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { notificationApi } from "../api/notification.api";
import type { UserNotificationData } from "../utils/notificationData";

export const NOTIFICATIONS_QUERY_KEY = ["notifications"]

class NotificationService {
  public getAllNotifByUser(): UseQueryResult<UserNotificationData[], Error> {
    return useQuery({
      queryKey: NOTIFICATIONS_QUERY_KEY,
      queryFn: () => notificationApi.getAllNotificationByUser(),
    });
  }

  public notifAllSeen(): UseQueryResult<UserNotificationData[], Error> {
    return useQuery({
      queryKey:["notif-seen-all"],
      queryFn: () => notificationApi.notifAllSeen()
    })
  }
}

export const notificationService = new NotificationService();