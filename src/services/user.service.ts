import { useMutation, useQuery, type UseMutationResult, type UseQueryResult } from "@tanstack/react-query";
import type { User } from "../features/types/user.type";
import { userApi } from "../api/user.api";
import type { IProfileInputs } from "../utils/ProfileData.type";
import type { IChangePasswordInputs } from "../features/auth/types/auth.type";



class UserService {

  public getAllUsersBySchool(schoolId: string | null) {
  return useQuery<User[], Error>({
    queryKey: ["usersBySchool", schoolId],
    enabled: !!schoolId, 
    queryFn: () => {
      if (!schoolId) {
        return Promise.resolve([]);
      }
      return userApi.getAllUsersBySchool(schoolId);
    },
  });
}


  public getById(id:string): UseQueryResult<User, Error> {
    return useQuery<User, Error>({
      queryKey: ['user' + id],
      queryFn: ()=> userApi.getUserById(id)
    });
  }

  public editProfile(): UseMutationResult<User, Error, { userId: string; data: IProfileInputs  }> {

    return useMutation({
      mutationFn: ({ userId, data }) => userApi.editProfile(userId, data)
    })
  }

   public editPassword(): UseMutationResult<User, Error, { userId: string; data: IChangePasswordInputs  }> {

    return useMutation({
      mutationFn: ({ userId, data }) => userApi.editPassword(userId, data)
    })
  }
}



export const userService = new UserService();
