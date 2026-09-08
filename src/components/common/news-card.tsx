import moment from "moment"
import "moment/locale/id"
import { Calendar, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn, truncateWords } from "@/lib/utils"
import { CustomCard } from "@/components/ui/simple/CustomCard"
import RichTextContent from "@/components/common/RichTextContent"

export interface NewsCardProps {
  id?: number
  title: string
  excerpt?: string
  date: string
  description?: string
  readTime?: string
  image?: string
  slug?: string
  className?: string
  isDetail?: boolean
  content?: string
  category?: string
  showCategory?: boolean
  author?: string
}

export default function NewsCard({ title, description, date, readTime, image, slug, className, content, category, author, isDetail = false }: NewsCardProps) {
  const rawCategory = category || "Umum";

  return (
   <Link href={`/article/${slug}`}>
       <CustomCard className={cn("overflow-hidden", className)}>
     <div className="relative w-full mb-4 aspect-[16/9]">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="py-3 flex flex-col justify-between px-4">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500 mb-3 min-w-0">
            {rawCategory && (
              <span className="font-semibold text-red-500 text-xs shrink-0 max-w-[160px] truncate" title={rawCategory}>
                [{isDetail ? rawCategory : truncateWords(rawCategory, 2)}]
              </span>
            )}
            <span className="text-gray-300 select-none shrink-0">•</span>
            <div className="flex items-center shrink-0">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{moment(date).locale('id').format('dddd, D-MM-YYYY')}</span>
            </div>
             {
            isDetail &&  <>
                        <span className="text-gray-300 select-none shrink-0">•</span>
                        <div className="flex items-center shrink-0">
                          <Eye className="h-4 w-4 mr-1" />
                          <span>{readTime}</span>
                        </div>
                        </>
          }
          </div>
        <h3 className={`font-bold mb-2 transition-colors ${!isDetail ? 'hover:text-[#0d6b3f]' : ''
          }`}>
          {
            !isDetail ? <p className="line-clamp-3" title={title}>{title}</p>
              : title 
          }
        </h3>
        {
          !isDetail && <p className="text-gray-600 mb-4 text-md line-clamp-4" title={description}>{description}</p>
        }
        {
          isDetail && <RichTextContent content={content || ''} />
        }

        {
          isDetail && <p className="self-start align-baseline text-base font-semibold text-black my-5">({author})</p>
        }
      </div>
    </CustomCard>
   </Link>
  )
}
