import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

const Badge = forwardRef(({ 
  className, 
  variant = 'default',
  size = 'sm',
  children,
  ...props 
}, ref) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-gradient-to-r from-primary to-secondary text-white',
    secondary: 'bg-gradient-to-r from-secondary to-primary text-white',
    success: 'bg-gradient-to-r from-success to-green-600 text-white',
    warning: 'bg-gradient-to-r from-warning to-yellow-600 text-white',
    error: 'bg-gradient-to-r from-error to-red-600 text-white',
    info: 'bg-gradient-to-r from-info to-blue-600 text-white',
    urgent: 'bg-gradient-to-r from-accent to-red-500 text-white animate-pulse-glow',
    high: 'bg-gradient-to-r from-warning to-orange-500 text-white',
    medium: 'bg-gradient-to-r from-info to-blue-500 text-white',
    low: 'bg-gradient-to-r from-success to-green-500 text-white'
  }

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  }

  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full font-medium shadow-sm',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
})

Badge.displayName = 'Badge'

export default Badge