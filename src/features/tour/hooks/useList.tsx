import { useInfiniteQuery } from "@tanstack/react-query";
import { ListTour } from "../types/tour.type";
import TourService from "../services/tour.service";

function useTour(params: Record<string, string | number> = {} ) {
    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        refetch,
      }  = useInfiniteQuery<ListTour, Error>({
        initialPageParam: null,
        queryKey: ["tours", params],
        queryFn: async ({ pageParam = null }) => {
          return await TourService.getAll(
                { 
                    ...params,
                    cursor: pageParam
                }
            );
        },
        getNextPageParam: (lastPage) => {
            if (!lastPage?.meta?.next_page_url) {
                return undefined;
            }
            const url = new URL(lastPage.meta.next_page_url);
            const cursor = url.searchParams.get("cursor");
            return cursor ?? undefined;
        }
      })

    return {
      data,
      isLoading,
      isFetching,
      hasNextPage,
      fetchNextPage,
      refetch,
      isError,
      isFetchingNextPage
    };
  }
  
  export default useTour;