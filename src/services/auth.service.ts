import axios from "axios";
// import type { ISignInInputs } from "../../pages/auth/PageSignIn";
// import type { IUserInfos } from "../../pages/auth/PageSignUp";
import type { IForgetPasswordInput } from "../pages/auth/ForgotPasswordPage";
// import type { ICodeInput } from "../../pages/auth/PageCodePassword";


const API_URL = import.meta.env.VITE_API_URL; 


export async function changePassword(userPass: IChangePasswordInputs):Promise<void> {
 try {
    const token = localStorage.getItem("token");

    // Requête HTTP
    const response = await fetch(`${API_URL}/changepassword`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${JSON.parse(token)}` : "",
      },
      body: JSON.stringify({
        password: userPass.password,
        confirmPassword: userPass.confirmPassword,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur changment de password");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur changePassword:", error);
    throw error; //pour que useMutation dans onError
  }
}



export async function forgetPassword(body: IForgetPasswordInput): Promise<string>{
  try {

    const response = await axios.post("/api/auth/forgetpassword", body);

    if (response.status === 200) {
      return "Un lie a été envoyé parmail.";
    } else {
      return "Erreur. réessayer.";
    }
  } catch (error:any) {
    console.error("Erreur forgetPasswrd :", error);
    if (error.response?.status === 404) {
      return "Aucun compte a cet email.";
    }
    return "Erreur serveur.réessayer.";
  }
};


// export const verifyCode = async (body: ICodeInput): Promise<string> => {
//   try {
//     console.log("Vérifiction du code :", body);
//     const response = await axios.post("auth/verifycode", body);
//     if (response.status === 200) {
//       return response.data?.message || "Code validé.  créer un nouveau mot de passe.";
//     }

//     return "Error veuillez réessayer.";
//   } catch (error: any) {
//     console.error("Erreur verifyCode :", error);

//     // Gestion classique des erreurs backend
//     if (error.response?.status === 400) {
//       return "Le code est invalide ou expiré.";
//     }
//     if (error.response?.status === 404) {
//       return "Aucun code pour cet utilisatur.";
//     }

//     return "Erreur serveur.réessayer.";
//   }
// };

import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { AuthResponse, IChangePasswordInputs, ISigninData, ISignupData } from "../features/auth/types/auth.type";
import { authApi } from "../api/auth.api";


class AuthService {

  public signup(): UseMutationResult<AuthResponse, Error, ISignupData> {
    return useMutation({
      mutationFn: (user: ISignupData) => authApi.signup(user),
    });
  }

  public signin(): UseMutationResult<AuthResponse, Error, ISigninData> {
    return useMutation({
      mutationFn: (user: ISigninData) => authApi.signin(user),
    });
  }

  public logout() {
    return useMutation({
      mutationFn: async () => await authApi.destroyTokenUser(),
    });
  }
}

export const authService = new AuthService();
