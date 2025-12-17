import type { Child } from "../features/types/child.type";
import { axiosClient } from "../utils/axios.client";

const api = axiosClient();

class ChildApi {
  public async getChildGenderPercentage(): Promise<number[]> {
    try {
      const { data } = await api.get<{ data: { stats: number[] } }>("child/gender")

      // const data = [50,50]
      return data.data.stats;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async getGenderPercentageByClass(): Promise<number[]> {
    try {
      const { data } = await api.get<{ data: { stats: number[] } }>(`/child/gender/referent`);
      return data.data.stats;
      // return data
    } catch (error: any) {
      console.error("Erreur dans getGenderPercentageByClass:", error);
      throw new Error(error);
    }
  }

  public async getChildrenByParent(parentId: string): Promise<Child[]> {
     try {
      const { data } = await api.get(`/child/parent/${parentId}`);
    return data;
  } catch (error: any) {
      console.error("Erreur dans getChildrenByParent:", error);
      throw new Error(error);
    }

    
}

public async getChildrenByClass(classId:string): Promise<Child[]> {
     try {
      const { data } = await api.get(`/child/classe/${classId}`);
    return data;
  } catch (error: any) {
      console.error("Erreur dans getChildrenByClass:", error);
      throw new Error(error);
    }
}
}
export const childApi = new ChildApi()
