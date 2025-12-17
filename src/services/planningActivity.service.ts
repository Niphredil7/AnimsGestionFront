import { useMutation, useQuery, type UseMutationResult, type UseQueryResult } from "@tanstack/react-query";
import type { IPlanningActivityData, IPlanningActivityResponse } from "../utils/planningActivityData";
import { planningActivityApi } from "../api/planningActivity.api";
import type { PlanningActivity } from "../features/types/planningActivity";

class PlanningActivityService {

  //   public createPlanningActivity(): UseMutationResult<IPlanningActivityResponse, Error, IPlanningActivityData> {
  //   return useMutation<PlanningActivity, Error, {data:IPlanningActivityData}>({
  //       mutationKey:["createPlanning"],
  //     mutationFn: async ({data}) => planningActivityApi.createPlanningActivity(data),
  //   });
  // }

   public getByClassAndWeek(
    classId: string | null,
    dateStart: Date | null,
  ): UseQueryResult<IPlanningActivityResponse[], Error> {
    return useQuery({
      queryKey: ["planningActivities", classId, dateStart?.toISOString()],
      queryFn: () => {
        if (!classId || !dateStart) return Promise.resolve([]);
        const dateStr = dateStart.toISOString().split("T")[0];
        return planningActivityApi.getByClassAndWeek(classId, dateStr);
      },
    });
  }

    public validateActivity() {
    return useMutation<IPlanningActivityResponse, Error, string>({
      mutationKey: ["validatePlanningActivity"],
      mutationFn: (id: string) =>
        planningActivityApi.validatePlanningActivity(id),
    });
  }


  public deleteActivity() {
    return useMutation<void, Error, string>({
      mutationKey: ["deletePlanningActivity"],
      mutationFn: (id: string) =>
        planningActivityApi.deletePlanningActivity(id),
    });
  }
}

export const planningActivityService = new PlanningActivityService();