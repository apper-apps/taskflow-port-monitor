import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

const Textarea = forwardRef(({ 
  className, 
  error = false,
  rows = 3,
  ...props 
}, ref) => {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        'w-full px-4 py-2 border-2 border-gray-200 rounded-lg transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 focus:outline-none placeholder-gray-500 resize-none',
        error && 'border-error focus:border-error focus:ring-error',
        className
      )}
      {...props}
    />
  )
})

Textarea.displayName = 'Textarea'

export default Textarea