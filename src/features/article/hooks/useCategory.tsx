import { CategoryType } from "../types/category.type";
import CategoryService from "../services/category.service";
import { useQuery } from "@tanstack/react-query";

function useCategory(params: Record<string, string | number> = {}) {
    const {
        data,
        isLoading,
        isError,
        isFetching,
        refetch,
      } = useQuery<{data: CategoryType[]}>({
        queryKey: ["category", params],
        queryFn: async () => {
          return await CategoryService.getAll(params)
        },
      });

    return {
      data: data?.data,
      isLoading,
      isFetching,
      refetch,
      isError,
    };
  }
  
  export default useCategory;