import Link from "next/link"
import { cn } from "@/lib/utils"
import { ChevronRight, type LucideIcon } from "lucide-react"
import { CustomCard } from "@/components/ui/simple/CustomCard"

export interface FeatureCardProps {
  title: string
  description: string
  icon?: LucideIcon
  iconColor?: string
  accentColor?: string
  image?: string;
  link?: {
    text: string
    url: string
  }
  className?: string
  onClick?: () => void;
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  accentColor = "#0d6b3f",
  image,
  link,
  className,
  onClick,
}: FeatureCardProps) {
  const CardContent = (
    <CustomCard variant="accent" accentColor={accentColor} className={cn("h-full transition-all duration-300 hover:shadow-lg cursor-pointer p-6", className)}>
      <div className="h-full flex flex-col">
        {image ? (
          <div className="rounded-full bg-[#0d6b3f]/10 p-0 w-12 h-12 flex items-center justify-center mb-4 overflow-hidden flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={title}
              className="object-cover w-full h-full"
            />
          </div>
        ) : (
          Icon && (
            <div className="rounded-full bg-[#0d6b3f]/10 p-3 w-12 h-12 flex items-center justify-center mb-4 flex-shrink-0">
              <Icon className="h-6 w-6 text-[#0d6b3f]" />
            </div>
          )
        )}
        <h3 className="text-lg font-bold line-clamp-2" title={title}>{title}</h3>
        {!link && (
          <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-grow line-clamp-3 break-words" title={description}>{description}</p>
        )}
        {link && (
          <>
            <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-grow line-clamp-4 break-words" title={description}>{description}</p>
            <p className="text-sm text-[#0d6b3f] font-semibold flex items-center hover:underline mt-auto pt-2">
              {link.text}
              <ChevronRight className="h-4 w-4 ml-1" />
            </p>
          </>
        )}
      </div>
    </CustomCard>
  );

  if (onClick) {
    return (
      <div onClick={onClick} className="h-full block">
        {CardContent}
      </div>
    );
  }

  if (link) {
    return (
      <Link
        href={link.url}
        target={link.url.startsWith("http") ? "_blank" : "_self"}
        rel="noopener noreferrer"
        className="h-full block"
      >
        {CardContent}
      </Link>
    )
  }

  return (
    <div className="h-full block">
      {CardContent}
    </div>
  )
}
