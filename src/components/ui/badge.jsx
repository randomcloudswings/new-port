import * as React from 'react'
import { badgeVariants } from '@/lib/badge-variants'
import { cn } from '@/lib/utils'

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge }
