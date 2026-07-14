import Link from "next/link"
import NewsCard from "@/components/common/news-card"
import { ChevronRight } from "lucide-react"
import useArticle from "@/features/article/hooks/useArticle";
import { useContent } from "@/hooks/useContent";
import PageArticleSkeleton from "@/components/common/skeleton/PageArticleSkeleton";

export function NewsSection() {
  const { data, isLoading } = useArticle({ "page_size": 8, 'order': 'desc', 'by':'published_at' });
  const { article } = useContent();
  
  return (
      <section id="article" className="py-16 bg-gray-50 flex justify-center">
        <div className="w-full  px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{article.title}</h2>
            </div>
            <Link href="/article" className="text-[#0d6b3f] font-medium flex items-center hover:underline">
              Lihat Semua
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-1 gap-y-4 md:gap-2 lg:gap-4">
            {
              isLoading ?   <PageArticleSkeleton /> :
              data?.pages[0].data.length === 0 ? <div className="h-36 w-full col-span-1 md:col-span-3 xl:col-span-4  flex items-center justify-center"><p className="text-center">Tidak ada artikel</p></div> :
              data?.pages[0].data.slice(0, 8).map((item) => (
              <NewsCard
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                date={item.published_at ?? Date.now().toString()}
                className="h-full"
                image={item.thumbnail ?? "/images/placeholder.svg"}
                slug={item.slug}
                category={item.category?.name}
                showCategory={true}
              />
            ))}
          </div>
        </div>
      </section> 
  )
}
