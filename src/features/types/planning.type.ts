import type { PlanningActivity } from "./planningActivity"

export interface Planning {
    id:string
  dateStart:Date
  planningActivities: PlanningActivity[]

}


