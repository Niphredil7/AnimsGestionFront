import { axiosClient } from "../utils/axios.client";
import type { UserNotificationData } from "../utils/notificationData";

const api = axiosClient()

class NotificationApi {
  public async getAllNotificationByUser(): Promise<UserNotificationData[]> {
    try {
      const { data } = await api.get<UserNotificationData[]>("/notification/me");
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async notifAllSeen(): Promise<UserNotificationData[]>{
    try {
      const { data } = await api.patch<UserNotificationData[]>("notifications/seen-all");
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}


export const notificationApi = new NotificationApi()