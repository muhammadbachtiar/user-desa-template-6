"use client"
import NewsCard from '@/components/common/news-card'
import DatePicker from '@/components/form/form-elements/DatePicker';
import SelectCategoryFilter from '@/components/form/form-elements/SelectCategoryFilter';
import useArticle from '@/features/article/hooks/useArticle';
import React, { useEffect, useRef, useState } from 'react'

export default function PageArticle() {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [categoryId, setCategoryId] = useState(0);
  const [dateRange, setRangeDate] = useState('');
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useArticle({ "page_size": 8, "search": searchValue, "date": dateRange, 'order': 'desc', 'by':'published_at'}, categoryId);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
  };
  const articleImportData = data?.pages.flatMap(
    (page: any) => page?.data
  );
  useEffect(() => {
    const handleScroll = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        if (
          !isLoading &&
          hasNextPage &&
          window.innerHeight + window.scrollY >=
            document.body.offsetHeight - 600
        ) {
          fetchNextPage();
        }
      }, 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, hasNextPage, fetchNextPage]);

  return (
     <div className='flex justify-center'>
        <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl flex justify-between flex-col items-center my-10 gap-4">
          <div className="w-full grid grid-cols-6 justify-between items-center gap-4">
            <div className="relative w-full col-span-6">
                <input id="search-dropdown" type='search' value={searchValue} onChange={handleChange} className="block py-3 px-5 pe-12 w-full rounded-sm text-sm text-gray-900 bg-gray-100 placeholder:text-black border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Cari artikel ..." />
                <span className="absolute top-0 end-0 py-3 px-5 sm:ms-4 text-sm font-medium h-full text-white focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </span>
            </div>
            <div className="relative w-full col-span-6 md:col-span-2">
                 <SelectCategoryFilter setCategoryId={setCategoryId}/>
            </div>
            <div className="relative w-full col-span-6 md:col-span-4">
              <DatePicker setDate={setRangeDate} />
            </div>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-1 gap-y-4 md:gap-2 lg:gap-4">
            { 
              (!isLoading) && (!articleImportData || articleImportData.length === 0) ? <div className="h-36 col-span-1 md:col-span-3 xl:col-span-4 w-full flex items-center justify-center"><p className="text-center">Tidak ada artikel</p></div> :
              (articleImportData ?? []).map((item) => (
                <NewsCard
                  key={item.id}
                  id={item.id}
                  category={item.category?.name}
                  description={item.description}
                  title={item.title}
                  date={item.published_at ?? Date.now().toString()}
                  image={item.thumbnail ?? "/images/placeholder.svg"}
                  slug={item.slug}
                />
              ))}
              {(isLoading || isFetchingNextPage) && (
                  <div className="w-full col-span-1 md:col-span-3 xl:col-span-4 flex justify-center items-center my-12">
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                      <span className="text-gray-600 font-medium">Loading...</span>
                    </div>
                  </div>
                )
            }
          </div>
        </div>
     </div>
  )
}