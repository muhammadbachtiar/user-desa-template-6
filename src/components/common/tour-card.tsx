import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { CustomCard } from "@/components/ui/simple/CustomCard"

export interface TourCardProps {
  id?: number
  title?: string
  excerpt?: string
  date?: string
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

export function TourCard({ title, image, slug, className, excerpt }: TourCardProps) {
  return (
   <Link href={`/tour/${slug}`}>
       <CustomCard className={cn("overflow-hidden p-0", className)}>
      <div className={`relative aspect-[3/2]`}>
        <Image
          src={image || "/placeholder.svg"}
          alt={title || "Tour Image"}
          fill
          className='object-cover rounded-t-sm'
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="mt-4 flex flex-col justify-between px-4">        
        <h3 className={`font-bold mb-2 text-md transition-colors text-[#0d6b3f]`}>
          {
            title
          }
        </h3>    
         <p className="text-gray-600 mb-4 text-md line-clamp-4">{excerpt}</p>
      </div>
    </CustomCard>
   </Link>
  )
}
