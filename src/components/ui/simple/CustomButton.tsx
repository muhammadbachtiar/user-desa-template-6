import type React from "react"
import { Button as ShadcnButton } from "@/components/ui/simple/Button"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "link"
export type ButtonSize = "default" | "sm" | "lg" | "icon"

export interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: LucideIcon
  iconPosition?: "left" | "right"
  fullWidth?: boolean
  children?: React.ReactNode
  className?: string
}

export function CustomButton({
  variant = "primary",
  size = "default",
  icon: Icon,
  iconPosition = "left",
  fullWidth = false,
  children,
  className,
  ...props
}: CustomButtonProps) {
  // Map our custom variants to shadcn variants
  const getShadcnVariant = () => {
    switch (variant) {
      case "primary":
        return "default"
      case "secondary":
        return "secondary"
      case "outline":
        return "outline"
      case "ghost":
        return "ghost"
      case "link":
        return "link"
      default:
        return "default"
    }
  }

  // Get custom styles based on variant
  const getCustomStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-[#0d6b3f] hover:bg-[#0a5733] text-white"
      case "secondary":
        return "bg-white text-[#0d6b3f] hover:bg-gray-100"
      case "outline":
        return "border-[#0d6b3f] text-[#0d6b3f] hover:bg-[#0d6b3f] hover:text-white"
      default:
        return ""
    }
  }

  return (
    <ShadcnButton
      variant={getShadcnVariant()}
      size={size}
      className={cn(getCustomStyles(), fullWidth && "w-full", className)}
      {...props}
    >
      {Icon && iconPosition === "left" && <Icon className={cn("h-4 w-4", children && "mr-2")} />}
      {children}
      {Icon && iconPosition === "right" && <Icon className={cn("h-4 w-4", children && "ml-2")} />}
    </ShadcnButton>
  )
}
