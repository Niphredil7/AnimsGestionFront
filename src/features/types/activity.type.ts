export interface Activity {
    id:string,
    name:string 
    content?:string,
    img?:FileList,
    favorite:Favorite
    userId:string 
     room: {
    id: string;
    name: string;
  } | null;
    categoryMaterialId:string
    planningId:string,
    createdAt:Date
    updatedAt:Date
    validatedAt:Date
}


export type Favorite = "IsNotFavorite" | "IsFavorite" 

export interface Outing {
  name: string;
  content?: string;
  localisation: string;
  favorite: Favorite;
  userId: string;
  validatedAt?: Date;
  planningId: string;
}
