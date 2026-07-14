import { CustomButton } from "@/components/ui/simple/CustomButton"
import { Mail, Phone } from "lucide-react"
import type { CTASection as CTASectionType } from "@/types/Simple"

interface CTASectionProps {
  data: CTASectionType
}

export function CTASection({ data }: CTASectionProps) {
  // Function to render the correct icon
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "phone":
        return <Phone className="h-4 w-4 mr-2" />
      case "mail":
        return <Mail className="h-4 w-4 mr-2" />
      default:
        return null
    }
  }

  return (

    data.buttons.primary.url.indexOf('undefined') !== -1 ? (
      <section className="py-16 bg-[#0d6b3f]">
        <div className="px-6 lg:px-10 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 2xl:px-0  text-center animate-pulse">
          {/* Title Skeleton */}
          <div className="h-8 w-1/2 bg-white/30 rounded mx-auto mb-6"></div>

          {/* Description Skeleton */}
          <div className="h-5 w-2/3 bg-white/20 rounded mx-auto mb-2"></div>
          <div className="h-5 w-1/2 bg-white/20 rounded mx-auto mb-8"></div>

          {/* Button Skeletons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="h-12 w-48 bg-white/40 rounded"></div>
            <div className="h-12 w-48 border border-white/50 rounded"></div>
          </div>
        </div>
      </section>
    ) : (
      <section className="py-16 bg-[#0d6b3f]">
        <div className="px-6 lg:px-10 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 2xl:px-0  text-center">
          <h2 className="text-3xl font-bold text-white mb-6">{data.title}</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">{data.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CustomButton className="bg-white text-[#0d6b3f] hover:bg-gray-100" onClick={() => window.open(data.buttons.primary.url, '_blank')}>
              {renderIcon(data.buttons.primary.icon)}
              {data.buttons.primary.text}
            </CustomButton>
            <CustomButton variant="outline" className="border-white text-white hover:bg-white/20" onClick={() => window.open(data.buttons.secondary.url, '_blank')}>
              {renderIcon(data.buttons.secondary.icon)}
              {data.buttons.secondary.text}
            </CustomButton>
          </div>
        </div>
      </section>
    )

  )
}
