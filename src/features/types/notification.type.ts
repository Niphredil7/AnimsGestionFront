export interface Notification {
    id:string
    type:NotificationType
    message:string
    seen:boolean
    activityOutingId:string
    eventId:string
}

export interface UserHasNotification {
  notificationId:string
  userId:string
}

export type NotificationType = "EVENT" | "ACTIVITY"
