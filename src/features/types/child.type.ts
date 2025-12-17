import type { Class } from "./class.type"

export interface Child {
    id:string,
    schoolId:string,
    firstName:string,
    lastName: string, 
    sexe:GenreChild,
    classId: string,
    class: Class, 
    parentId: string,
    allergen:boolean 
    regime:Regime,
    activityForbiden: ActivityForbidenn,
}

export type GenreChild = "F" | "M"

export type Regime = "NONE" | "NOPORK" | "VEGETARIAN" | "PREPARED"


export type ActivityForbidenn = "NONE" | "ESCALATION" | "POOL"
  
  
