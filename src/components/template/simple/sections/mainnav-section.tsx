import { NavItem } from "@/types/Simple"


export const MainNav = ({ items }: { items: NavItem[] }) => {

    const sortedMenuItems = [...items].sort((a, b) => a.order - b.order)

    return (

        <nav className="hidden md:flex items-center gap-x-6">
            {sortedMenuItems.map((item) => (
                <div key={item.route} className="relative group">
                    <a
                        href={item.child === null ? item.route : "#"}
                        className={`font-medium inline-flex items-center whitespace-nowrap px-3 py-2 rounded-md transition-colors ${item.isActive
                            ? "text-[#0d6b3f]"
                            : "text-gray-700 hover:text-[#0d6b3f]"
                            }`}
                    >
                        {item.route === "/" && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 mr-1 shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M3 9l9-7 9 7v11a2 2 0 012 2H5a2 2 0 01-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                        )}
                        <span>{item.title}</span>
                        {item.child && (
                            <svg
                                className="w-3 h-3 ml-1 shrink-0"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path d="M19 9l-7 7-7-7" />
                            </svg>
                        )}
                    </a>

                    {/* Submenu */}
                    {item.child && (
                        <div className="absolute left-0 top-full z-50 hidden group-hover:flex flex-col bg-white shadow-lg border rounded-md min-w-[180px] py-2 pointer-events-auto">
                            {item.child.map((sub) => (
                                <a
                                    key={sub.route}
                                    href= { sub.staticPage !== null ? `/static/${sub.staticPage || '#'}` : sub.route }
                                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#0d6b3f] whitespace-nowrap"
                                >
                                    {sub.title}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </nav>

    )
}
