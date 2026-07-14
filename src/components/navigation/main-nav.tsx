"use client"

import { useState } from "react"
import type { MenuWithContent } from "../../types/menu"
import { MobileSidebar } from "./mobile-sidebar"
import { BiDotsHorizontalRounded } from "react-icons/bi"
import { NavMenu } from "./top-menu"

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

interface MainNavProps {
  menuData: MenuWithContent
  isScrolled?: boolean
  logo?: string
  regionEntity?: string
  regionDescription?: string
}

export function MainNav({ menuData, isScrolled, logo, regionEntity, regionDescription }: MainNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const sortedMenuItems = [...menuData].sort((a, b) => a.order - b.order)

  return (
    <nav className={classNames("relative z-10 transition-all duration-300 w-full flex justify-center")}>

      <MobileSidebar 
        menuData={menuData} 
        setIsOpen={setIsOpen} 
        isOpen={isOpen} 
        isScrolled={isScrolled} 
        logo={logo}
        regionEntity={regionEntity}
        regionDescription={regionDescription}
      />

      <div className="hidden lg:block w-full">
        <ul className="flex items-center justify-center gap-4">
          <NavMenu items={sortedMenuItems.slice(0,5)} isScrolled={isScrolled} />
          {sortedMenuItems.length > 5 && (
            <li className="relative flex items-center">
              <button
                onClick={() => setIsOpen(true)}
                className={classNames(
                  "px-3.5 py-2.5 transition-all duration-200 rounded-md flex items-center space-x-1 text-sm font-semibold border shadow-sm",
                  isScrolled
                    ? "bg-neutral-bg-subtle text-neutral-text border-gray-200 hover:bg-gray-100"
                    : "bg-white/10 text-white hover:bg-white/20 border-white/10"
                )}
                aria-label="More menu items"
              >
                <BiDotsHorizontalRounded size={18}/>
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}
