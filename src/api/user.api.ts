import type { IChangePasswordInputs } from "../features/auth/types/auth.type";
import type { User } from "../features/types/user.type";
import { axiosClient } from "../utils/axios.client";
import type { IProfileInputs } from "../utils/ProfileData.type";


const api = axiosClient()

class UserApi {

  public async getAllUsersBySchool(schoolId:string): Promise<User[]> {
    try {
      const { data } = await api.get<{data:{users:User[]}}>(`/user/school/${schoolId}`);
      return data.data.users;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async getUserById(id:string): Promise<User>{
    try {
      const { data } = await api.get<User>(`/user/${id}`);
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async editProfile(userId:string, data: IProfileInputs): Promise<User>{
    try {
      const response = await api.patch<{ data : User}>(`/user/${userId}`, data);

      return response.data.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async editPassword(userId:string, data: IChangePasswordInputs): Promise<User>{
    try {
      const response = await api.patch<{ data : User}>(`/user/${userId}/password`, data);

      return response.data.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export const userApi = new UserApi();
