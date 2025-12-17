import type { CategoryMaterial } from "../features/types/material.type";
import { axiosClient } from "../utils/axios.client";

const api = axiosClient()

class CategoryApi {
    public async getAllCategories(): Promise<CategoryMaterial[]> {
        try {
          const { data } = await api.get<{data: CategoryMaterial[]}>("/category-material");

          return data.data;
        } catch (error: any) {
          throw new Error(error);
        }
      }
}

export const categoryApi = new CategoryApi()