import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "emerald" | "blue" | "amber"
  size?: "small" | "medium" | "large"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "medium", ...props }, ref) => {
    const variantClass = `button-${variant}`
    const sizeClass = `button-${size}`

    return <button className={`button ${variantClass} ${sizeClass} ${className}`} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button }
