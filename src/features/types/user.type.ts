export interface User {
    id:string,
    username:string,
    email:string,
    schoolId?:string,
    firstname?:string,
    lastname?:string
    address?:string,
    zipCode?:number, 
    city:string 
    phone?:string,
    available?:string,
    content?:string 
    cv?:string 
    visibility:Visible,
    status:UserStatus, 
    role:UserRole, 
    photo?:string,
    token?:string,

}

export type Visible = "ALL" | "NO" | "PROFIL" | "CV"

export type UserRole = "COORDO" | "ANIMATOR" | "VISITOR" | "PARENT" | "ANIMATOR_PARENT"

export type UserStatus = "NOT_CONFIRMED" | "CONFIRMED" | "DEACTIVATED" | "BANNED"

