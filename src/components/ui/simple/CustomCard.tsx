// import type React from "react"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/simple/CustomCard"
// import { cn } from "@/lib/utils"
// import type { LucideIcon } from "lucide-react"

// export type CardVariant = "default" | "accent" | "outline" | "feature"

// export interface CustomCardProps {
//   variant?: CardVariant
//   title?: string
//   description?: string
//   icon?: LucideIcon
//   iconColor?: string
//   accentColor?: string
//   footer?: React.ReactNode
//   children?: React.ReactNode
//   className?: string
//   contentClassName?: string
//   headerClassName?: string
//   footerClassName?: string
// }

// export function CustomCard({
//   variant = "default",
//   title,
//   description,
//   icon: Icon,
//   iconColor = "#0d6b3f",
//   accentColor = "#0d6b3f",
//   footer,
//   children,
//   className,
//   contentClassName,
//   headerClassName,
//   footerClassName,
// }: CustomCardProps) {
//   // Get custom styles based on variant
//   const getCardStyles = () => {
//     switch (variant) {
//       case "accent":
//         return `border-t-4 border-t-[${accentColor}]`
//       case "feature":
//         return "border shadow-sm"
//       case "outline":
//         return "border-2 border-[#0d6b3f]"
//       default:
//         return ""
//     }
//   }

//   return (
//     <Card className={cn(getCardStyles(), className)}>
//       {(title || description || Icon) && (
//         <CardHeader className={cn(headerClassName)}>
//           {Icon && (
//             <div className={`rounded-full bg-[${iconColor}]/10 p-3 w-12 h-12 flex items-center justify-center mb-4`}>
//               <Icon className={`h-6 w-6 text-[${iconColor}]`} />
//             </div>
//           )}
//           {title && <CardTitle>{title}</CardTitle>}
//           {description && <CardDescription>{description}</CardDescription>}
//         </CardHeader>
//       )}
//       <CardContent className={cn("pt-0", !title && !description && !Icon && "pt-6", contentClassName)}>
//         {children}
//       </CardContent>
//       {footer && <CardFooter className={cn(footerClassName)}>{footer}</CardFooter>}
//     </Card>
//   )
// }

import type React from "react"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/simple/card"

export type CardVariant = "default" | "accent" | "outline" | "feature"

export interface CustomCardProps {
  variant?: CardVariant
  title?: string
  description?: string
  icon?: LucideIcon
  iconColor?: string
  accentColor?: string
  footer?: React.ReactNode
  children?: React.ReactNode
  className?: string
  contentClassName?: string
  headerClassName?: string
  footerClassName?: string
}

export function CustomCard({
  variant = "default",
  title,
  description,
  icon: Icon,
  // iconColor = "#0d6b3f",
  // accentColor = "#0d6b3f",
  footer,
  children,
  className,
  contentClassName,
  headerClassName,
  footerClassName,
}: CustomCardProps) {
  // Get custom styles based on variant
  const getCardStyles = () => {
    switch (variant) {
      case "accent":
        return "border-t-4 border-t-[#0d6b3f]"
      case "feature":
        return "border shadow-sm"
      case "outline":
        return "border-2 border-[#0d6b3f]"
      default:
        return ""
    }
  }

  return (
    <Card className={cn(getCardStyles(), "transform transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg", className)}>
      {(title || description || Icon) && (
        <CardHeader className={cn(headerClassName)}>
          {Icon && (
            <div className="rounded-full bg-[#0d6b3f]/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <Icon className="h-6 w-6 text-[#0d6b3f]" />
            </div>
          )}
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className={cn("pt-0", !title && !description && !Icon && "h-full", contentClassName)}>
        {children}
      </CardContent>
      {footer && <CardFooter className={cn(footerClassName)}>{footer}</CardFooter>}
    </Card>
  )
}
