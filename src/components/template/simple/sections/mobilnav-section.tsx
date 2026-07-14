import { useState } from "react"
import { Menu, X } from "lucide-react"
import { NavItem } from "@/types/Simple"

export const MobileNav = ({ items }: { items: NavItem[] }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 text-gray-700 hover:text-[#0d6b3f]"
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Floating Menu Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setOpen(false)}>
          <div
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            className="fixed top-0 left-0 w-3/4 max-w-xs h-full bg-white shadow-lg p-5 z-50 overflow-y-auto transition-transform duration-300"
          >
            <h2 className="text-lg font-bold mb-4 text-[#0d6b3f]">Menu</h2>
            <nav className="flex flex-col space-y-2">
              {items.map((item) => (
                <div key={item.title}>
                  <a
                    href={item.route || "#"}
                    className="text-gray-800 hover:text-[#0d6b3f] font-medium block py-2"
                  >
                    {item.title}
                  </a>
                  {/* Submenu jika ada */}
                  {item.children && (
                    <div className="pl-4 space-y-1">
                      {item.children.map((sub) => (
                        <a
                          key={sub.route}
                          href={sub.route}
                          className="text-sm text-gray-600 hover:text-[#0d6b3f] block"
                        >
                          {sub.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}