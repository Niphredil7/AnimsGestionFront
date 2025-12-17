import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { CategoryMaterial } from "../features/types/material.type";
import { categoryApi } from "../api/category.api";

class CategoryService {

    public getAllCategory(): UseQueryResult<CategoryMaterial[], Error> {
        return useQuery({
            queryKey : ["categoryMaterial"],
            queryFn: categoryApi.getAllCategories,
        })
    }
}

export const categoryService = new CategoryService();