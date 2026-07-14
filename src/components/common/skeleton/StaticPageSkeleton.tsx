export default function StaticPageSkeleton() {
  return (
    
    <div className="px-6 lg:px-10 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 2xl:px-0 w-full flex justify-between mb-10 mt-10">
       <div className="px-6 lg:px-10 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 2xl:px-0  flex justify-between mb-10 mt-10">
          <div className='box-border grid grid-cols-12 gap-5 justify-between'>
            <div className='w-full col-span-12 lg:col-span-9'>
                <div className="h-96 bg-gray-200 rounded w-96 animate-pulse" />
            </div>
            <div className='flex flex-col col-span-12 lg:col-span-3 gap-6 w-full'>    
                <div className="gap-2">
                  <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
                </div>
                  <div>
                  <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
                </div>
            </div>
        </div>
    </div>
    </div>
  );
}
