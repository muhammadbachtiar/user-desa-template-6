import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'
import 'moment/locale/id';

interface PressReleaseCardProps {
  id: number
  title: string
  description: string
  date: string
  image: string
  slug: string
  author?: string
  category?: string
}

export const PressReleaseCard: React.FC<PressReleaseCardProps> = ({
  id,
  title,
  description,
  date,
  image,
  slug,
  author,
  category,
}) => {
  const formattedDate = moment(date ?? "").locale('id').format('dddd, D MMMM YYYY ')

  return (
    <div key={id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-white hover:border-[#0d6b3f] transition-colors duration-200">
      <Link href={`/press-release/${slug}`} passHref>
        <div className="cursor-pointer">
          <div className="relative w-full h-48">
            <Image
              src={image}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-md"
            />
          </div>
          <div className="p-4">
            {category && (
              <span className="text-sm text-[#0d6b3f] font-mono mb-2 inline-block">
                [{category}]
              </span>
            )}
            <h3 className="text-lg font-mono text-black font-semibold mb-2 line-clamp-2">
              {title}
            </h3>
            <p className="text-gray-600 text-sm font-mono line-clamp-3">
              {description}
            </p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-xs text-gray-700 font-mono">
                {formattedDate}
              </span>
              {author && (
                <span className="text-xs text-gray-600 font-mono">
                  By {author}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}