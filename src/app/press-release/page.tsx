"use client"
import { PressReleaseCard } from '@/features/press-release/component/PressReleaseCard'
import React, { useEffect, useRef, useState } from 'react'
import SelectCategoryFilter from '@/components/form/form-elements/SelectCategoryFilter'
import CustomDatePicker from '@/components/form/form-elements/DatePicker'
import usePressRelease from '@/features/press-release/hooks/usePressRelease'
import { PressReleaseType } from '@/features/press-release/types/pressRelease.type'
import { useRouter } from 'next/navigation'
import useFeatureFlags from '@/hooks/useFeatureFlags'

export default function PressReleaseListPage() {
  const router = useRouter();
  const { pressRelease, isLoading: isFeaturesLoading } = useFeatureFlags();
  
  const debounceRef = useRef<NodeJS.Timeout | null>(null)
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setRangeDate] = useState('');
  const [categoryId, setCategoryId] = useState(0);
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = usePressRelease({
    page: 1,
    page_size: 9,
    search: searchTerm,
    date: dateRange,
    sortBy: 'publishedAt',
  }, categoryId)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const pressReleaseData = data?.pages.flatMap((page) => page?.data) ?? []

  useEffect(() => {
    const handleScroll = () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }

      debounceRef.current = setTimeout(() => {
        if (
          !isLoading &&
          hasNextPage &&
          window.innerHeight + window.scrollY >= document.body.offsetHeight - 600
        ) {
          fetchNextPage()
        }
      }, 200)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isLoading, hasNextPage, fetchNextPage])

  useEffect(() => {
    if (!isFeaturesLoading && !pressRelease) {
      router.replace('/');
    }
  }, [pressRelease, isFeaturesLoading, router]);

  // Loading state saat mengecek features
  if (isFeaturesLoading) {
    return (
      <div className="flex justify-center bg-gray-50 min-h-screen">
        <div className="w-full flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  if (!pressRelease) {
    return null;
  }

  return (
    <div className="flex justify-center bg-gray-50">
      <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl flex flex-col lg:flex-row gap-6 p-6">
        <aside className="w-full lg:min-w-1/4 bg-white p-5 rounded-lg shadow-xl lg:sticky top-24 self-start transition-all duration-300 border-l-4 border-[#0d6b3f]">
          <h2 className="text-xl font-mono mb-5 border-b-2 border-[#0d6b3f] pb-2 text-[#0d6b3f] font-semibold">
            Filter
          </h2>
          <div className="space-y-5">
            <div className="relative">
              <input
                type="search"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Cari siaran pers..."
                className="w-full py-2.5 px-4 text-gray-800 rounded-md border-2 border-[#0d6b3f] focus:outline-none focus:ring-2 focus:ring-[#0d6b3f]/50 font-mono transition-all duration-200 placeholder-gray-500"
              />
            </div>
            <div className="relative w-full col-span-6 md:col-span-2">
              <SelectCategoryFilter setCategoryId={setCategoryId} />
            </div>
            <div className="relative w-full col-span-6 md:col-span-4">
              <CustomDatePicker setDate={setRangeDate} />
            </div>
          </div>
        </aside>

        <main className="w-full lg:min-w-3/4">
          <header className="bg-[#0d6b3f] text-white p-5 rounded-t-lg mb-5 shadow-md">
            <h1 className="text-2xl font-mono font-bold">SIARAN PERS</h1>
            <p className="text-sm font-mono">Pemerintah Kabupaten Muara Enim (Press Release)</p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading ? (
              <div className="col-span-full flex justify-center items-center py-10">
                <span className="font-mono text-gray-600 animate-pulse">Loading...</span>
              </div>
            ) : pressReleaseData.length === 0 || pressReleaseData[0] === undefined ? (
              <div className="col-span-full flex justify-center items-center py-10">
                <span className="font-mono text-gray-600">Tidak ada siaran pers</span>
              </div>
            ) : (
              pressReleaseData.map((item: PressReleaseType) => (
                <PressReleaseCard
                  key={item.id}
                  id={item.id}
                  category={item.category?.name}
                  title={item.title}
                  description={item.description}
                  date={item.published_at}
                  image={item.thumbnail ?? '/images/placeholder.svg'}
                  slug={item.slug}
                  author={item.user?.name}
                />
              ))
            )}
            {isFetchingNextPage && (
              <div className="min-w-3/4 col-span-full flex justify-center items-center py-10">
                <span className="font-mono text-gray-600 animate-pulse">Loading...</span>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
