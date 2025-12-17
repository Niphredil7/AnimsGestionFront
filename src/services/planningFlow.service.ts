import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { EMoment } from "../features/types/planningActivity";
import type {  IActivityData, IActivityResponse } from "../utils/activityData.type";
import type { IPlanningActivityData, IPlanningActivityResponse } from "../utils/planningActivityData";
import type { IPlanningData, IPlanningResponse } from "../utils/planningData.type";
import { planningApi } from "../api/planning.api";
import { activityApi } from "../api/activity.api";
import { planningActivityApi } from "../api/planningActivity.api";

type FullCreateInput = {
  activity: IActivityData;
  classId: string;
  day: number;
  moment: EMoment;
};

type FullCreateResult = {
  planning: IPlanningResponse;
  activity: IActivityResponse;
  planningActivity: IPlanningActivityResponse;
};

class PlanningFlowService {
  public useCreateActivityWithPlanning(): UseMutationResult<
    FullCreateResult,
    Error,
    FullCreateInput
  > {
    return useMutation({
      mutationFn: async (input: FullCreateInput): Promise<FullCreateResult> => {
        const { activity, classId, day, moment } = input;

        //  la semaine de la date de l’activité
        const planningPayload: IPlanningData = {
          dateStart: new Date(activity.date),
        };
        const planning = await planningApi.createPlanning(planningPayload);

        //activité
        const activityResponse = await activityApi.createActivity(activity);

        // planningActivity
        const planningActivityPayload: IPlanningActivityData = {
          planningId: planning.id,
          activityId: activityResponse.id,
          classId,
          day,
          moment,
        };

        const planningActivity = await planningActivityApi.createPlanningActivity(
          planningActivityPayload
        );

        return {
          planning,
          activity: activityResponse,
          planningActivity,
        };
      },
    });
  }
}

export const planningFlowService = new PlanningFlowService();