"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  useFloating,
  offset,
  flip,
  shift,
  size,
  autoUpdate,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  FloatingFocusManager,
  useHover,
  safePolygon,
  useFocus,
  FloatingTree,
  useFloatingNodeId,
  FloatingNode,
} from "@floating-ui/react"
import { MenuItem } from "@/types/menu"

function sortByOrder<T extends { order: number }>(arr: T[] = []) {
  return [...arr].sort((a, b) => a.order - b.order)
}

function combineRoutes(parent: string | undefined | null, child: string | undefined | null) {
  const p = (parent || "").trim()
  const c = (child || "").trim()
  if (!p) return c || "/"
  if (!c) return p || "/"

  const normP = p.startsWith("/") ? p : `/${p}`
  const normC = c.startsWith("/") ? c : `/${c}`

  if (normC === normP || normC.startsWith(`${normP}/`)) return normC

  if (normP === "/") return normC

  if (normC === "/") return normP

  return `${normP}${normC}`
}

function isPathActive(pathname: string | null | undefined, href: string | undefined | null) {
  if (!pathname || !href) return false
  try {
    const norm = href.startsWith("/") ? href : `/${href}`
    // aktif bila path sama atau path berada di bawah href
    return pathname === norm || pathname.startsWith(`${norm}/`)
  } catch {
    return false
  }
}

function hasActiveDescendant(
  node: MenuItem,
  base: string | null | undefined,
  pathname: string | null | undefined,
): boolean {
  const currentBase = combineRoutes(base, node.route)
  if (isPathActive(pathname || "", currentBase)) return true
  if (!Array.isArray(node.child)) return false
  return node.child.some((c) => hasActiveDescendant(c, currentBase, pathname))
}

function SideSubmenu({
  item,
  parentLabel,
  parentRoute,
}: {
  item: MenuItem
  parentLabel: string
  parentRoute: string
}) {
  const [open, setOpen] = React.useState(false)

  const [isMobile, setIsMobile] = React.useState(false)
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)")
    const coarse = window.matchMedia("(pointer: coarse)")
    const update = () => setIsMobile(mq.matches || coarse.matches)
    update()
    mq.addEventListener?.("change", update)
    coarse.addEventListener?.("change", update)
    return () => {
      mq.removeEventListener?.("change", update)
      coarse.removeEventListener?.("change", update)
    }
  }, [])

  const nodeId = useFloatingNodeId()

  const { refs, floatingStyles, context } = useFloating({
    nodeId,
    open,
    onOpenChange: setOpen,
    placement: "right-start",
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset({ mainAxis: 0, crossAxis: -4 }), 
      flip({
        fallbackPlacements: ["left-start", "right-start"],
        crossAxis: true,
        fallbackStrategy: "bestFit",
      }),
      shift({ padding: 8, crossAxis: true }),
      size({
        apply({ availableHeight, availableWidth, elements }) {
          Object.assign((elements.floating as HTMLElement).style, {
            maxHeight: `${Math.max(availableHeight - 8, 160)}px`,
            maxWidth: `${Math.max(Math.min(availableWidth, 320), 200)}px`,
            overflow: "auto",
          })
        },
        padding: 8,
      }),
    ],
  })

  const hover = useHover(context, {
    enabled: !isMobile,
    handleClose: safePolygon({
      blockPointerEvents: true,
      buffer: 4,
      requireIntent: false,
    }),
    delay: { open: 0, close: 200 }, // Add close delay
    move: true,
    restMs: 100,
  })
  const click = useClick(context, { toggle: true, enabled: isMobile })
  const focus = useFocus(context)
  const dismiss = useDismiss(context, { bubbles: true })
  const role = useRole(context, { role: "menu" })
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, click, focus, dismiss, role])

  const hasChildren = Array.isArray(item.child) && item.child.length > 0
  const currentBase = combineRoutes(parentRoute, item.route)

  const pathname = usePathname()
  const isActiveBtn =
    isPathActive(pathname, currentBase) ||
    (hasChildren && item.child!.some((c) => hasActiveDescendant(c, currentBase, pathname)))

  const panelId = React.useId()

  return (
    <FloatingNode id={nodeId}>
      <li className="relative">
        <button
          ref={refs.setReference}
          {...getReferenceProps()}
          className={`flex min-w-52 w-full items-center justify-between rounded-md px-3 py-2 text-sm outline-none
                      transition-colors duration-150
                      focus-visible:ring-2 focus-visible:ring-ring
                      ${
                        open || isActiveBtn
                          ? "bg-secondary text-secondary-foreground border border-border"
                          : "border border-transparent hover:bg-secondary hover:text-secondary-foreground"
                      }`}
          data-open={open ? "true" : "false"}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${parentLabel} → ${item.title}`}
          type="button"
        >
          <span className="truncate text-pretty">{item.title}</span>
          {hasChildren ? (
            <span className="ml-2 inline-block text-muted-foreground" aria-hidden>
              {"›"}
            </span>
          ) : null}
        </button>

        {hasChildren && open ? (
          <FloatingPortal>
            <FloatingFocusManager context={context} modal={false}>
              <div
                id={panelId}
                ref={refs.setFloating}
                style={floatingStyles}
                {...getFloatingProps()}
                className="z-50 rounded-md border border-border bg-popover text-popover-foreground shadow-lg
                           animate-in slide-in-from-left-2 duration-150"
              >
                <ul className="min-w-52 max-w-[80vw] p-1 bg-white">
                  {sortByOrder(item.child!).map((child) => {
                    const childHas = Array.isArray(child.child) && child.child.length > 0
                    if (childHas) {
                      return (
                        <SideSubmenu
                          key={`${parentLabel}-${item.title}-${child.title}`}
                          item={child}
                          parentLabel={`${parentLabel} → ${item.title}`}
                          parentRoute={currentBase}
                        />
                      )
                    }
                    const leafHref = combineRoutes(currentBase, child.route)
                    const isActiveLeaf = isPathActive(pathname, leafHref)
                    return (
                      <li key={`${parentLabel}-${item.title}-${child.title}`}>
                        <Link
                          href={leafHref}
                          aria-current={isActiveLeaf ? "page" : undefined}
                          className={`block rounded-md px-3 py-2 text-sm outline-none transition-colors duration-150
                                      focus-visible:ring-2 focus-visible:ring-ring
                                      ${
                                        isActiveLeaf
                                          ? "bg-secondary text-secondary-foreground border border-border"
                                          : "hover:bg-secondary hover:text-secondary-foreground"
                                      }`}
                        >
                          <span className="truncate text-pretty">{child.title}</span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </FloatingFocusManager>
          </FloatingPortal>
        ) : null}
      </li>
    </FloatingNode>
  )
}

function TopMenuTrigger({
  item,
  isScrolled,
}: {
  item: MenuItem
  isScrolled?: boolean
}) {
  const [open, setOpen] = React.useState(false)

  const [isMobile, setIsMobile] = React.useState(false)
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)")
    const coarse = window.matchMedia("(pointer: coarse)")
    const update = () => setIsMobile(mq.matches || coarse.matches)
    update()
    mq.addEventListener?.("change", update)
    coarse.addEventListener?.("change", update)
    return () => {
      mq.removeEventListener?.("change", update)
      coarse.removeEventListener?.("change", update)
    }
  }, [])

  const nodeId = useFloatingNodeId()

  const { refs, floatingStyles, context } = useFloating({
    nodeId,
    open,
    onOpenChange: setOpen,
    placement: "bottom-start",
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset({ mainAxis: 4 }),
      flip({
        fallbackPlacements: ["bottom-end"],
        fallbackStrategy: "bestFit",
      }),
      shift({ padding: 8 }),
      size({
        apply({ availableHeight, availableWidth, elements }) {
          Object.assign((elements.floating as HTMLElement).style, {
            maxHeight: `${Math.min(availableHeight - 8, 560)}px`,
            maxWidth: `${Math.min(availableWidth - 8, 352)}px`,
            overflow: "auto",
          })
        },
        padding: 8,
      }),
    ],
  })

  const hover = useHover(context, {
    enabled: !isMobile,
    handleClose: safePolygon({
      blockPointerEvents: true,
      buffer: 4,
      requireIntent: false,
    }),
    delay: { open: 0, close: 200 }, 
    move: true,
    restMs: 100,
  })
  const click = useClick(context, { toggle: true, enabled: isMobile })
  const focus = useFocus(context)
  const dismiss = useDismiss(context, { bubbles: true })
  const role = useRole(context, { role: "menu" })
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, click, focus, dismiss, role])

  const hasChildren = Array.isArray(item.child) && item.child.length > 0
  const currentBase = item.route

  const pathname = usePathname()
  const isActiveBtn =
    isPathActive(pathname, currentBase) ||
    (hasChildren && item.child!.some((c) => hasActiveDescendant(c, currentBase, pathname)))

  const panelId = React.useId()

  return (
    <FloatingNode id={nodeId}>
      <li className="relative">
        <button
          ref={refs.setReference}
          {...getReferenceProps()}
          className={`inline-flex items-center rounded-sm px-3.5 py-2.5 text-sm font-semibold outline-none transition-all duration-200
                      focus-visible:ring-2 focus-visible:ring-ring
                      ${
                        open || isActiveBtn
                          ? isScrolled 
                            ? "bg-neutral-bg-subtle text-brand-primary border-b-2 border-brand-primary"
                            : "bg-white/15 text-white border-b-2 border-brand-gold"
                          : isScrolled
                            ? "border border-transparent text-neutral-text-muted hover:text-neutral-text hover:bg-neutral-bg-subtle"
                            : "border border-transparent text-white/80 hover:text-white hover:bg-white/10"
                      }`}
          data-open={open ? "true" : "false"}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={panelId}
          type="button"
        >
          <span className="text-pretty">{item.title}</span>
          <span className="ml-1 text-muted-foreground" aria-hidden>
            {"▾"}
          </span>
        </button>

        {hasChildren && open ? (
          <FloatingPortal>
            <FloatingFocusManager context={context} modal={false}>
              <div
                id={panelId}
                ref={refs.setFloating}
                style={floatingStyles}
                {...getFloatingProps()}
                className="z-50 overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-lg
                           animate-in slide-in-from-top-2 duration-150"
              >
                <div className="max-h-[min(70vh,560slidepx)] overflow-auto p-2 bg-white">
                  <ul>
                    {sortByOrder(item.child!).map((child) => {
                      const childHas = Array.isArray(child.child) && child.child.length > 0
                      if (childHas) {
                        return (
                          <SideSubmenu
                            key={`${item.title}-${child.title}`}
                            item={child}
                            parentLabel={item.title}
                            parentRoute={item.route || ""}
                          />
                        )
                      }
                      const href = combineRoutes(item.route, child.route)
                      const isActive = isPathActive(pathname, href)
                      return (
                        <li key={`${item.title}-${child.title}`}>
                          <Link
                            href={href}
                            aria-current={isActive ? "page" : undefined}
                            className={`block rounded-md px-3 py-2 text-sm outline-none transition-colors duration-150
                                        focus-visible:ring-2 focus-visible:ring-ring
                                        ${
                                          isActive
                                            ? "bg-secondary text-secondary-foreground border border-border"
                                            : "hover:bg-secondary hover:text-secondary-foreground"
                                        }`}
                          >
                            <span className="truncate text-pretty">{child.title}</span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </FloatingFocusManager>
          </FloatingPortal>
        ) : null}
      </li>
    </FloatingNode>
  )
}

export function NavMenu({
  items,
  currentPath: externalPath,
  isScrolled,
}: {
  items: MenuItem[]
  currentPath?: string
  isScrolled?: boolean
}) {
  const top = sortByOrder(items || [])
  const pathname = usePathname() || externalPath || ""

  return (
    <nav aria-label="Primary" className="w-full bg-transparent">
      <div className="mx-auto max-w-6xl">
        <FloatingTree>
          <ul role="menubar" className="flex w-full items-center justify-center gap-4 xl:gap-6 py-2 overflow-x-auto no-scrollbar">
            {top.map((it) => {
              const hasChildren = Array.isArray(it.child) && it.child.length > 0
              const topHref = it.route || "#"
              const isActiveTop =
                isPathActive(pathname, topHref) ||
                (hasChildren && it.child!.some((c) => hasActiveDescendant(c, it.route, pathname)))

              if (!hasChildren) {
                return (
                  <li key={`${it.title}-${it.order}`} role="none">
                    <Link
                      role="menuitem"
                      href={topHref}
                      aria-current={isActiveTop ? "page" : undefined}
                      className={`inline-flex items-center rounded-sm px-3.5 py-2.5 text-sm font-semibold transition-all duration-200
                                  focus-visible:ring-2 focus-visible:ring-ring
                                  ${
                                    isActiveTop
                                      ? isScrolled
                                        ? "bg-neutral-bg-subtle text-brand-primary border-b-2 border-brand-primary"
                                        : "bg-white/15 text-white border-b-2 border-brand-gold"
                                      : isScrolled
                                        ? "text-neutral-text-muted hover:text-neutral-text hover:bg-neutral-bg-subtle"
                                        : "text-white/80 hover:text-white hover:bg-white/10"
                                  }`}
                    >
                      <span className="text-pretty">{it.title}</span>
                    </Link>
                  </li>
                )
              }

              return <TopMenuTrigger key={it.title} item={it} isScrolled={isScrolled} />
            })}
          </ul>
        </FloatingTree>
      </div>
    </nav>
  )
}