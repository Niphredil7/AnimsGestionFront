import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { Class } from "../features/types/class.type";
import { classApi } from "../api/class.api";


class ClassService {
    
  public getMyClass() {
    return useQuery<Class, Error>({
      queryKey: ["myClass"],
      queryFn: () => classApi.getMyClass(),
    });
  }
public getClassByUser(userId: string) {
  return useQuery<Class, Error>({
    queryKey: ["classUser", userId],
    queryFn: () => classApi.getClassByUser(userId),
    enabled: !!userId,
  });
}
  
}



export const classService = new ClassService();