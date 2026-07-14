import { Mail, Phone } from 'lucide-react'
import React from 'react'
import Sosmed from './sosmed'
import useSetting from '@/hooks/useSettings';

export default function Topbar() {
  const { data: setting, isLoading } = useSetting(`footer-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});

  const Skeleton = ({ className }: { className: string }) => (
    <div className={`animate-pulse bg-white/20 rounded ${className}`} />
  )

  return (

    isLoading || !setting ? (
      <div className="bg-[#0d6b3f] text-white py-2 flex justify-center w-full">
        <div className="px-0 w-full max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl flex-col sm:flex-row gap-2 flex justify-between items-start sm:items-center">
          {/* Left Side - Phone & Email */}
          <div className="flex flex-col sm:flex-row  items-start sm:items-center gap-2 space-x-4 text-sm">
            {/* Phone */}
            <div className="flex items-center space-x-1">
              <Skeleton className="h-4 w-4 rounded-full bg-green-800" />
              <Skeleton className="h-4 w-24 bg-green-800" />
            </div>
            {/* Email */}
            <div className="flex items-center space-x-1">
              <Skeleton className="h-4 w-4 rounded-full bg-green-800" />
              <Skeleton className="h-4 w-36 bg-green-800" />
            </div>
          </div>

          {/* Right Side - Sosmed icons */}
          <div className="flex space-x-2">
            <Skeleton className="h-5 w-5 rounded-full bg-green-800" />
            <Skeleton className="h-5 w-5 rounded-full bg-green-800" />
            <Skeleton className="h-5 w-5 rounded-full bg-green-800" />
          </div>
        </div>
      </div>
    ) : (
      <div className="bg-[#0d6b3f] text-white py-2 flex justify-center w-full">
        <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl flex-col sm:flex-row gap-2 flex justify-between items-start sm:items-center">
          <div className="flex flex-col sm:flex-row  items-start sm:items-center space-x-4 text-sm">
            <a 
              href={`tel:${setting?.value?.contactUs?.phone}`} 
              className="flex items-center hover:text-green-200 transition-colors duration-200"
              aria-label="Hubungi kami via telepon"
            >
              <Phone className="h-4 w-4 mr-1" />
              <span>{setting?.value?.contactUs?.phone}</span>
            </a>
            <a 
              href={`mailto:${setting?.value?.contactUs?.email}`} 
              className="flex items-center hover:text-green-200 transition-colors duration-200"
              aria-label="Kirim email kepada kami"
            >
              <Mail className="h-4 w-4 mr-1" />
              <span>{setting?.value?.contactUs?.email}</span>
            </a>
          </div>
          <Sosmed />
        </div>
      </div>
    )


  )
}