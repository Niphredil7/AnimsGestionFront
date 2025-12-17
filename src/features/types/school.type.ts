export interface School {
    id:string 
    name:string  
    address:string 
    zipCode:number, 
    city:string  
    type:SchoolType  
}

export type SchoolType = "PRIMAIRE" | "MAERNELLE" | "PRIMAIRE_MATERLLE"