import type { NotificationType } from "../features/types/notification.type";
import type { EMoment } from "../features/types/planningActivity";


export interface UserNotificationData {
  id: string;
  type: NotificationType; 
  message: string;
  createdAt: string | Date;
  seen: boolean;

  data:
    | HappeningNotificationData
    | ActivityNotificationData
    | null;
}

/* HAPPENING  */
export interface HappeningNotificationData {
  kind: "HAPPENNING";
  id: string;
  title: string;
  content: string;
  dateStart: string | Date;
  dateEnd: string | Date;
}

/* ACTIVITY  */
export interface ActivityNotificationData {
  kind: "ACTIVITY";
  id: string;
  moment: EMoment;
  validatedAt: string | Date;
  activityId?: string;
  outingId?: string;
  planningId: string;
  classId: string;
}
