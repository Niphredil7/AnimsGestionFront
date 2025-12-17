import type { Class } from "../features/types/class.type";
import { axiosClient } from "../utils/axios.client";

const api = axiosClient()

class ClassApi {
  public async getMyClass(): Promise<Class> {
    const { data } = await api.get<{
      data: { classe: Class };
      message: string;
    }>("/classe/me");

    return data.data.classe;
  }

public async getClassByUser(userId: string): Promise<Class> {
  const { data } = await api.get<{
    data: Class;
    message: string;
  }>(`/classe/user/${userId}`)

  return data.data;
}
}

export const classApi = new ClassApi();