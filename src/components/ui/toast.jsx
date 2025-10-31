import * as React from 'react'
import { cn } from '@/lib/utils'

const Toast = React.forwardRef(({ className, variant = 'default', ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full',
        'data-[state=open]:slide-in-from-bottom-full data-[state=open]:sm:slide-in-from-bottom-full',
        {
          'border-border bg-background text-foreground': variant === 'default',
          'border-destructive bg-destructive/10 text-destructive':
            variant === 'destructive',
          'border-primary bg-primary/10 text-primary-foreground': variant === 'success',
        },
        className
      )}
      {...props}
    />
  )
})
Toast.displayName = 'Toast'

const ToastTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-sm font-semibold', className)} {...props} />
))
ToastTitle.displayName = 'ToastTitle'

const ToastDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-sm opacity-90', className)} {...props} />
))
ToastDescription.displayName = 'ToastDescription'

export { Toast, ToastTitle, ToastDescription }
