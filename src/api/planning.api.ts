import type { Planning } from "../features/types/planning.type";
import { axiosClient } from "../utils/axios.client";
import type { IPlanningData, IPlanningResponse } from "../utils/planningData.type";
import type { ResponseInterfaceWithData } from "../utils/response.interface";

const api = axiosClient();

class PlanningApi {
   public async createPlanning(data: IPlanningData): Promise<IPlanningResponse> {
    try {
      const { data: response } = await api.post<
        ResponseInterfaceWithData<{ newPlanning: IPlanningResponse }>
      >("/planning", data);
      return response.data.newPlanning;
    } catch (error: any) {
      console.error("Erreur createPlanning :", error?.response?.data || error);
      throw error;
    }
  }

  public async getNextPlanning(classId: string,
    from: string,       // "YYYY-MM-DD"
    count = 4,): Promise<Planning[]> {
   try { 
    const { data } = await api.get<{ data: Planning[] }>(`/planning/class/${classId}/next`, { params: { from, count } });
    return data.data;
    } catch(error: any) {
      throw new Error(error);
  }
}
}
export const planningApi = new PlanningApi();