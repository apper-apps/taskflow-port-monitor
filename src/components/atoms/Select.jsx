import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

const Select = forwardRef(({ 
  className, 
  error = false,
  children,
  ...props 
}, ref) => {
  return (
    <select
      ref={ref}
      className={cn(
        'w-full px-4 py-2 border-2 border-gray-200 rounded-lg transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 focus:outline-none bg-white',
        error && 'border-error focus:border-error focus:ring-error',
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
})

Select.displayName = 'Select'

export default Select