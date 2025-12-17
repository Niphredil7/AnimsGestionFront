import type { Activity } from "../features/types/activity.type";
import type { IActivityResponse, IActivityData, IActivityUpdateData } from "../utils/activityData.type";
import { axiosClient } from "../utils/axios.client";
import type { ResponseInterfaceWithData } from "../utils/response.interface";

const api = axiosClient()

class ActivityApi {

  public async createActivity(data: IActivityData): Promise<IActivityResponse> {
    try {
      const { data: response } = await api.post<
        ResponseInterfaceWithData<{ newActivity: IActivityResponse }>
      >("/activity", data);
      return response.data.newActivity;
    } catch (error: any) {
      console.error("Erreur createActivity :", error?.response?.data || error);
      throw error;
    }
  }

  public async getActivitiesByUser(userId:string): Promise<Activity[]> {
      try {
      
        const { data } = await api.get<Activity[]>(`/activity/${userId}`);
        
        return data;
      } catch (error: any) {
        throw new Error(error);
      }
    }

    public async updateActivity(id:string, payload: IActivityUpdateData): Promise<IActivityResponse> {
    try {
      const { data: response } = await api.patch<
        ResponseInterfaceWithData<{ newActivity: IActivityResponse }>
      >(`/activity/${id}`, payload);
      return response.data.newActivity;
    } catch (error: any) {
      console.error("Erreur updateActivity :", error?.response?.data || error);
      throw error;
    }
  }
}

export const activityApi = new ActivityApi();
