import { useQuery } from "@tanstack/react-query";
import { ArticleType } from "../types/article.type";
import ArticleService from "../services/article.service";

function useArticleDetail(params: Record<string, string | number> = {}, slug: string) {
    const { data } =  useQuery<{data: ArticleType}>({
        queryKey: ["article", slug, params],
        queryFn: async () => {
          return await ArticleService.getOne(slug, params)
        },
      })

    return {
      data: data?.data,      
    };
  }
  
  export default useArticleDetail;