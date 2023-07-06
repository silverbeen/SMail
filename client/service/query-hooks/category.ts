import {useMutation, useQuery} from "react-query";
import http from "../common";

export const CATEGORY_KEYS = {
  all: ["category"],
  lists: () => [...CATEGORY_KEYS.all, "list"],
  list: <T>(search: T) => [...CATEGORY_KEYS.lists(), {search}],
};

export interface CategoryResponseDto {
  title: string;
  list: CategoryListResponseDto[];
}

export interface CategoryListResponseDto {
  fieldId: number;
  categoryId: number;
  fieldName: string;
  contentCnt: string;
}

export const useGetCategory = () => {
  return useQuery(CATEGORY_KEYS.lists(), () =>
    http.get<CategoryResponseDto[]>(`/category`)
  );
};

// interface CreateCategoryRequestDto {
//   name: string;
// }

// export const useCreateCategory = () => {
//   return useMutation((data: CreateCategoryRequestDto) =>
//     http.post("/category", data)
//   );
// };
