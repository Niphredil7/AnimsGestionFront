import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { childApi } from "../api/child.api";
import type { Child } from "../features/types/child.type";


class ChildService {

 public getChildByParent(parentId:string):UseQueryResult<Child[], Error>{
 return useQuery({
  queryKey: ["childrenByParent", parentId],
  queryFn: () => childApi.getChildrenByParent(parentId),
})};

public getGenderPercentage(): UseQueryResult<number[], Error> {
    return useQuery<number[], Error>({
      queryKey: ['childrenGender'],
      queryFn: childApi.getChildGenderPercentage,
    });
  }
public getGenderPercentageByClass(): UseQueryResult<number[], Error> {

    return useQuery({
      queryKey: ["genderByClass"],
      queryFn: () => childApi.getGenderPercentageByClass(),

      
    });
  }

   public getChildrenByClass(classId:string):UseQueryResult<Child[], Error>{
 return useQuery({
  queryKey: ["childrenByClass", classId],
  queryFn: () => childApi.getChildrenByClass(classId),
  enabled: !!classId,
})};

}


export const childService = new ChildService();