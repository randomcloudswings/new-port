import * as React from 'react'
import { cn } from '@/lib/utils'

const Label = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        'text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        'text-accent-light',
        className
      )}
      {...props}
    />
  )
})
Label.displayName = 'Label'

export { Label }
