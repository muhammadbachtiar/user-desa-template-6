import React from 'react'

export default function ArtikelPopulerSkeleton() {
  return (
    <div className='w-full'>
      <h2 className='text-xl font-bold mb-4'>Berita Populer</h2>
      <ul className='space-y-4'>
        {Array.from({ length: 3 }).map((_, i) => (
          <li key={i} className="shadow-sm animate-pulse rounded-md overflow-hidden">
            <div className="relative h-36 bg-gray-200 rounded-md" />
            <div className="h-4 mt-2 bg-gray-300 rounded w-3/4" />
          </li>
        ))}
      </ul>
    </div>
  )
}
