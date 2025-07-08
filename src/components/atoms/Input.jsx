import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

const Input = forwardRef(({ 
  className, 
  type = 'text',
  error = false,
  ...props 
}, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        'w-full px-4 py-2 border-2 border-gray-200 rounded-lg transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 focus:outline-none placeholder-gray-500',
        error && 'border-error focus:border-error focus:ring-error',
        className
      )}
      {...props}
    />
  )
})

Input.displayName = 'Input'

export default Input