import type { Activity, Outing } from "./activity.type";

export interface PlanningActivity {
  id: string;
  day: number;           
  moment: EMoment;       
  activity?:Activity | null;
  outing?: Outing | null;
  planningId: string
  classId:string,

}

export enum EMoment {
  MORNING = "MORNING",
  NOON = "NOON",
  EVENING = "EVENING",
}