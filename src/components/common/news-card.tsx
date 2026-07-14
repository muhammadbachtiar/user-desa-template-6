import moment from "moment"
import "moment/locale/id"
import { Calendar, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
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
        <div className="flex items-center text-sm text-gray-500 mb-3">
            <span className="font-semibold text-red-500 text-xs">[{category}]</span>
            <span className="mx-2">•</span>
            <Calendar className="h-4 w-4 mr-1" />
            <span>{moment(date).locale('id').format('dddd, D-MM-YYYY')}</span>
             {
            isDetail &&  <>
                        <span className="mx-2">•</span>
                        <Eye className="h-4 w-4 mr-1" />
                        <span>{readTime}</span>
                        </>
          }
          </div>
        <h3 className={`font-bold mb-2 transition-colors ${!isDetail ? 'hover:text-[#0d6b3f]' : ''
          }`}>
          {
            !isDetail ? <p className="line-clamp-3">{title}</p>
              : title 
          }
        </h3>
        {
          !isDetail && <p className="text-gray-600 mb-4 text-md line-clamp-4">{description}</p>
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
