import { useMutation, useQuery, type UseMutationResult, type UseQueryResult } from "@tanstack/react-query";
import type { IPlanningData, IPlanningResponse } from "../utils/planningData.type";
import { planningApi } from "../api/planning.api";
import type { Planning } from "../features/types/planning.type";


class PlanningService {

    public createPlanning(): UseMutationResult<IPlanningResponse, Error, IPlanningData> {
    return useMutation({
      mutationFn: (planning: IPlanningData) => planningApi.createPlanning(planning),
    });
  }

  public getNextPlanning(classId: string,
    from: string,
    count = 4,): UseQueryResult<Planning[], Error> {
    return useQuery<Planning[], Error>({
      queryKey: ["plannings", "next", classId, from, count],
      queryFn: () => planningApi.getNextPlanning(classId, from, count),
      enabled: !!classId && !!from,
    });
  }
}

export const planningService = new PlanningService();

