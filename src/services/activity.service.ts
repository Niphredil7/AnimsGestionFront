import { useMutation, useQuery, type UseMutationResult, type UseQueryResult } from "@tanstack/react-query";
import type { IActivityResponse, IActivityData, IActivityUpdateData } from "../utils/activityData.type";
import { activityApi } from "../api/activity.api";


class ActivityService {

    public createActivity(): UseMutationResult<IActivityResponse, Error, IActivityData> {
    return useMutation({
      mutationFn: (activity: IActivityData) => activityApi.createActivity(activity),
    });
  }

  public updateActivity(id: string): UseMutationResult<IActivityResponse, Error, IActivityUpdateData> {
  return useMutation({
    mutationFn: (payload: IActivityUpdateData) => activityApi.updateActivity(id, payload),
  });
}

  // public getActivitesByUser(userId:string): UseQueryResult<Activity[], Error> {
  //   return useQuery({
  //           queryKey : ["activitesByUser" + userId],
  //           queryFn: activityApi.getActivitiesByUser,
  //       })
  // }
}

export const activityService = new ActivityService();