import type { Favorite } from "./activity.type"

export interface Feedback {
    status:Favorite
    userId:string
    planningId:string
}

export interface FeedbackWithActivity {
  planningId: string;
  status: Favorite; 
  userId: string;
  createdAt: string;
  updatedAt: string;
  activityId: string;
  activityName: string ;
}

export interface FeedbackActivitySummary {
  activityId: string;
  activityName: string;
  likes: number;
}