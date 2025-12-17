import type { Favorite } from "../features/types/activity.type";
import type { EMoment } from "../features/types/planningActivity";


export interface IActivityData {
  name: string;
  content?: string;
  roomId: string;
  categoryMaterialId?: string;
  userId: string;
  date: string; 
  momentEnum: EMoment,
  favorite:Favorite
}

export interface IActivityResponse {

    id:string,
    name:string
    content?:string
    picture?:string
    favorite:Favorite
    userId:string
    roomId:string
    categoryMaterialId?:string
    validatedAt?:Date
    planningId:string
  }

  export interface IActivityUpdateData {

    name:string
    content?:string
    favorite:Favorite
    userId:string
    roomId:string
    categoryMaterialId?:string
    validatedAt?:Date
    planningId:string

  }
