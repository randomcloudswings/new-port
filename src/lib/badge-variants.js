import { cva } from 'class-variance-authority'

export const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-accent/80 text-accent-light hover:bg-accent/90',
        secondary:
          'border-transparent bg-background-secondary text-accent-light hover:bg-background-secondary/80',
        outline: 'border-accent/40 text-accent-light hover:bg-accent/10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)
