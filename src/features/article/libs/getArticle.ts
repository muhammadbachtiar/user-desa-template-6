import { cache } from 'react';
import ArticleService from "@/features/article/services/article.service";
import { ArticleType } from "@/features/article/types/article.type";

export const getArticle = cache(async (slug: string): Promise<ArticleType> => {
  const response = await ArticleService.getOne(slug, { with: "user,category" });
  return response.data;
});
