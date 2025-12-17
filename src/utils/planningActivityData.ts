import type { EMoment } from "../features/types/planningActivity";

export interface IPlanningActivityData {
  day: number;         
  moment: EMoment;   
  activityId:string,
  outingid?:string
  planningId:string,
  classId:string,
}

export interface IPlanningActivityResponse {
    id:string
    moment: EMoment
    validatedAt?:Date
    activity?: {
    id: string;
    name: string;
    room?: { 
      id: string;
      name: string;
    } | null;
  } | null;
  outing?: {
    id: string;
    name: string;
  } | null;
    planningId:string
    classId: { 
      id: string;
      name: string;
    }
    day:number
}