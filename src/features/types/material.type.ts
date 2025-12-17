export interface Material {
    id:string
    name:string
}

export interface CategoryMaterial {
    id:string
    name:string
}

export interface CategoryHasMaterial {
    categoryMaterialId:string
    materialId:string
}