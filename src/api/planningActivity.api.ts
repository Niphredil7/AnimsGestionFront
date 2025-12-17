import { axiosClient } from "../utils/axios.client";
import type { IPlanningActivityData, IPlanningActivityResponse } from "../utils/planningActivityData";
import type { ResponseInterfaceWithData } from "../utils/response.interface";

const api = axiosClient();

class PlanningActivityApi {
  public async createPlanningActivity(
    data: IPlanningActivityData
  ): Promise<IPlanningActivityResponse> {
    try {
      const { data: response } = await api.post<
        ResponseInterfaceWithData<{ newPlanActivity: IPlanningActivityResponse }>
      >("/planning-activity", data);
      return response.data.newPlanActivity;
    } catch (error: any) {
      console.error(
        "Erreur createPlanningActivity :",
        error?.response?.data || error
      );
      throw error;
    }
  }

public async getByClassAndWeek(
    classId: string,
    dateStart: string, // "YYYY-MM-DD"
  ): Promise<IPlanningActivityResponse[]> {
    const { data } = await api.get<{
      data: { planActivities: IPlanningActivityResponse[] };
      message: string;
    }>(`/planning-activity/class/${classId}`, {
      params: { dateStart },
    });

    return data.data.planActivities;
  }

  public async validatePlanningActivity(
    planningActivityId: string
  ): Promise<IPlanningActivityResponse> {
    try {
      const { data: response } = await api.patch<
        ResponseInterfaceWithData<{ newPlanActivity: IPlanningActivityResponse }>
      >(`/planning-activity/${planningActivityId}/validate`);

      return response.data.newPlanActivity;
    } catch (error: any) {
      console.error(
        "Erreur validatePlanningActivity :",
        error?.response?.data || error
      );
      throw error;
    }
  }

  public async deletePlanningActivity(
    planningActivityId: string
  ): Promise<void> {
    try {
      await api.delete(`/planning-activity/${planningActivityId}`);
    } catch (error: any) {
      console.error(
        "Erreur deletePlanningActivity :",
        error?.response?.data || error
      );
      throw error;
    }
  }
}

export const planningActivityApi = new PlanningActivityApi();

