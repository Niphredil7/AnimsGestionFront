import type { User } from "../../types/user.type";

export interface ISignupData {
  email: string;
  password: string;
  confirmPassword: string;
  city:string,
  username:string;
}

export interface AuthResponse {
data: {
    
    user: User


    access_token: string;
    refresh_token: string;

  }
}

export interface changePassResponse {
  password:string
  newPassword:string
  confirmPassword:string
}

export interface RefreshResponse {
  data: {
  access_token: string;
  refresh_token: string;
}
}

export interface ISigninData {
  email: string;
  password: string;
}

export interface IChangePasswordInputs {
  currentPassword:string
  password: string
  confirmPassword: string
}

export interface IForgotPasswordInputs {
  password: string
  confirmPassword: string
}