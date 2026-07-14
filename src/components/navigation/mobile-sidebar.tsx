"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import type { MenuWithContent } from "../../types/menu"
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react"
import { FaX } from "react-icons/fa6"
import { GiHamburgerMenu } from "react-icons/gi"

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

interface MobileSidebarProps {
  menuData: MenuWithContent
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  isScrolled?: boolean
  logo?: string
  regionEntity?: string
  regionDescription?: string
}

export function MobileSidebar({
  menuData,
  isOpen,
  setIsOpen,
  isScrolled,
  logo,
  regionEntity,
  regionDescription
}: MobileSidebarProps) {

  const pathname = usePathname()
  const sidebarRef = useRef<HTMLDivElement>(null)

  const sortedMenuItems = [...menuData].sort((a, b) => a.order - b.order)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname, setIsOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, setIsOpen])

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscKey)
    return () => document.removeEventListener("keydown", handleEscKey)
  }, [isOpen, setIsOpen])

  return (
    <div className="block z-30">
      <button
        onClick={() => setIsOpen(true)}
        className={classNames(
          "p-2 block lg:hidden rounded-md transition-colors",
          isScrolled ? "text-neutral-text hover:bg-neutral-bg-subtle" : "text-white hover:bg-white/10"
        )}
        aria-label="Open menu"
      >
        <GiHamburgerMenu className="h-6 w-6" />
      </button>

      <div
        className={classNames(
          "fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 backdrop-blur-sm",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <div
        id="mobile-sidebar"
        ref={sidebarRef}
        className={classNames(
          "fixed !top-0 right-0 z-50 h-screen w-72 max-w-[80vw] bg-neutral-bg text-neutral-text shadow-2xl transition-transform duration-300 ease-in-out border-l border-gray-200 dark:border-gray-800 flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Brand Header */}
        <div className="flex flex-col p-5 border-b border-gray-200 dark:border-gray-800 bg-brand-primary/5">
          <div className="flex items-center justify-between mb-3.5">
            {logo ? (
              <Image
                src={logo}
                alt="Logo"
                width={36}
                height={36}
                className="object-contain shrink-0"
              />
            ) : (
              <div className="w-9 h-9 bg-brand-primary/10 rounded-full flex items-center justify-center font-bold text-brand-primary">M</div>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-neutral-text-muted hover:bg-neutral-bg-subtle hover:text-brand-primary rounded-full transition-all duration-300 hover:rotate-90"
              aria-label="Close menu"
            >
              <FaX className="h-4 w-4" />
            </button>
          </div>
          {regionEntity && (
            <div className="space-y-0.5">
              <h2 className="text-sm font-bold text-brand-primary uppercase tracking-wider leading-tight">{regionEntity}</h2>
              {regionDescription && (
                <p className="text-[10px] text-neutral-text-muted font-semibold leading-tight">{regionDescription}</p>
              )}
            </div>
          )}
        </div>

        {/* Navigation List */}
        <div className="overflow-y-auto flex-1 py-4">
          <ul className="list-none flex flex-col px-3 space-y-1 font-medium">
            {sortedMenuItems.map((menu) => (
              <li key={menu.order} className="w-full">
                {!menu.child || menu.child.length === 0 ? (
                  <Link
                    href={menu.route || "/"}
                    className={classNames(
                      "block w-full text-sm font-semibold py-2 px-3 rounded-lg transition-all duration-200",
                      pathname === menu.route
                        ? "bg-brand-primary text-white font-bold shadow-sm"
                        : "text-neutral-text hover:bg-brand-primary/5 hover:text-brand-primary",
                    )}
                  >
                    {menu.title}
                  </Link>
                ) : (
                  <Disclosure as="div" className="w-full">
                    {({ open }) => (
                      <>
                        <DisclosureButton
                          className={classNames(
                            "flex justify-between items-center w-full text-sm font-semibold py-2 px-3 rounded-lg transition-all duration-200",
                            pathname.startsWith(menu.route || "")
                              ? "bg-brand-primary/5 text-brand-primary font-bold"
                              : "text-neutral-text hover:bg-brand-primary/5 hover:text-brand-primary",
                          )}
                        >
                          <span>{menu.title}</span>
                          <svg
                            className={classNames(
                              "w-3 h-3 transition-transform duration-300 shrink-0 ml-2",
                              open ? "rotate-180" : "rotate-0",
                            )}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m1 1 4 4 4-4"
                            />
                          </svg>
                        </DisclosureButton>

                        <DisclosurePanel className="transition-all duration-300 overflow-hidden">
                          <ul className="list-none mt-1 pl-4 border-l border-gray-200 dark:border-gray-800 ml-4 py-1 space-y-1">
                            {menu.child?.map((submenu, index) => {
                              const fullPath = `${menu.route || ""}${submenu.route || ""}`
                              return (
                                <li
                                  key={submenu.order}
                                  className="transform transition-all duration-200"
                                  style={{
                                    transitionDelay: `${index * 15}ms`,
                                  }}
                                >
                                  {!submenu.child || submenu.child.length === 0 ? (
                                    <Link
                                      href={fullPath}
                                      className={classNames(
                                        "block text-xs font-semibold py-2 px-3 rounded-md transition-all duration-200",
                                        pathname === fullPath
                                          ? "bg-brand-primary/10 text-brand-primary font-bold"
                                          : "text-neutral-text-muted hover:bg-brand-primary/5 hover:text-brand-primary",
                                      )}
                                    >
                                      {submenu.title}
                                    </Link>
                                  ) : (
                                    <NestedSubmenu submenu={submenu} parentPath={fullPath} level={1} />
                                  )}
                                </li>
                              )
                            })}
                          </ul>
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

interface NestedSubmenuProps {
  submenu: MenuWithContent[0]
  parentPath: string
  level: number
}

function NestedSubmenu({ submenu, parentPath, level }: NestedSubmenuProps) {
  const pathname = usePathname()

  if (!submenu.child || submenu.child.length === 0) return null

  return (
    <Disclosure as="div" className="w-full mt-0.5">
      {({ open }) => (
        <>
          <DisclosureButton
            className={classNames(
              "flex justify-between items-center w-full text-xs font-semibold py-2 px-3 rounded-md transition-all duration-200",
              pathname.startsWith(parentPath)
                ? "bg-brand-primary/5 text-brand-primary font-bold"
                : "text-neutral-text-muted hover:bg-brand-primary/5 hover:text-brand-primary",
            )}
          >
            <span>{submenu.title}</span>
            <svg
              className={classNames("w-3 h-3 transition-transform duration-300 shrink-0 ml-2", open ? "rotate-180" : "rotate-0")}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </DisclosureButton>
          <DisclosurePanel className="transition-all duration-300 overflow-hidden">
            <ul className="list-none mt-1 pl-3 border-l border-gray-200 dark:border-gray-800 ml-4 py-1 space-y-1">
              {submenu.child?.map((childItem, index) => {
                const fullChildPath = `${parentPath}${childItem.route || ""}`
                return (
                  <li
                    key={childItem.order}
                    className="transform transition-all duration-200"
                    style={{
                      transitionDelay: `${index * 15}ms`,
                    }}
                  >
                    {childItem.staticPage !== null && !childItem.child && (
                      <Link
                        href={fullChildPath}
                        className={classNames(
                          "block text-[11px] font-semibold py-1.5 px-3 rounded-md transition-all duration-200",
                          pathname === fullChildPath
                            ? "bg-brand-primary/10 text-brand-primary font-bold"
                            : "text-neutral-text-muted hover:bg-brand-primary/5 hover:text-brand-primary",
                        )}
                      >
                        {childItem.title}
                      </Link>
                    )}
                    {childItem.child && childItem.child.length > 0 && (
                      <NestedSubmenu submenu={childItem} parentPath={fullChildPath} level={level + 1} />
                    )}
                  </li>
                )
              })}
            </ul>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}
