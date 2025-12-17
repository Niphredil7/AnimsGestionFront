
import { axiosClient, AxiosRefreshClient } from "../utils/axios.client";
import type { AuthResponse, ISigninData, ISignupData, RefreshResponse } from "../features/auth/types/auth.type";
import { classStore } from "../features/store/class.store";
import { userStore } from '../features/store/user.store'
import type { User } from "../features/types/user.type";
import axios, { AxiosError } from "axios";


const BACK_URL = import.meta.env.VITE_BACK_URL; 

const api = axiosClient();


class AuthApi {

  public async signup(data: ISignupData): Promise<AuthResponse> {
    try {
      const { data: response } = await api.post<AuthResponse>("/auth/signup", data);
      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async signin(data: ISigninData): Promise<AuthResponse> {
    try {
      const { data: response } = await api.post<AuthResponse>("/auth/signin", data);
      userStore.getState().setUser(response.data.user)
      return response;
    } catch (error: any) {

      throw new Error(error);
    }
  }

  public async refreshTokens(): Promise<RefreshResponse> {
    const refreshToken = userStore.getState().refresh_token


    if (!refreshToken) {
      throw new Error("Aucun refreshToken disponible.");
    }
    try{
      const { data } = await AxiosRefreshClient().post<RefreshResponse>(`http://localhost:3000/auth/refresh`, null, { headers:{Authorization:'Bearer ' + refreshToken} });

      return data;
    } catch(error) {

      const err = error as AxiosError
      console.log("🚀 ~ AuthApi ~ ERROR ~ err:", err)
      throw new Error(err.message);
    }
  }

// (`/auth/refresh`)

// public async changePassword(): Promise<User> {
//   try {
//       const { data: response } = await api.patch<AuthResponse>("/auth/signup", data);
//       return response;
//     } catch (error: any) {
//       throw new Error(error);
//     }
// }


    public async destroyTokenUser(): Promise<void> {

      userStore.getState().clearUser();
       classStore.getState().clearClass();
}

  }


export const authApi = new AuthApi();

