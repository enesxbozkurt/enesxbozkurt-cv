'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
    size?: 'sm' | 'md' | 'lg' | 'icon'
    asChild?: boolean
}

// Create a motion component that can accept standard HTML button props
const MotionButton = motion.button

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : MotionButton

        // Animation props for Framer Motion (only applied if not asChild)
        const motionProps = !asChild ? {
            whileHover: { scale: 1.02 },
            whileTap: { scale: 0.98 },
            transition: { type: "spring", stiffness: 400, damping: 17 }
        } : {}

        return (
            // @ts-ignore - refined types for Comp are tricky with Slot/Motion mix
            <Comp
                className={cn(
                    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                    'disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden',
                    {
                        // Primary variant - neon green with glow
                        'bg-primary text-bg shadow-[0_0_20px_rgba(41,255,79,0.3)] hover:shadow-[0_0_30px_rgba(41,255,79,0.5)] hover:bg-primary-dark':
                            variant === 'primary',
                        // Secondary variant - dark with border
                        'bg-panel border border-border text-text hover:border-primary/50 hover:shadow-[0_0_20px_rgba(41,255,79,0.2)]':
                            variant === 'secondary',
                        // Outline variant
                        'border border-primary text-primary hover:bg-primary/10':
                            variant === 'outline',
                        // Ghost variant
                        'text-text hover:bg-white/5 hover:text-primary':
                            variant === 'ghost',
                        // Destructive variant
                        'bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20':
                            variant === 'destructive',
                    },
                    {
                        'h-9 px-4 text-sm': size === 'sm',
                        'h-11 px-6 text-base': size === 'md',
                        'h-14 px-8 text-lg': size === 'lg',
                        'h-9 w-9': size === 'icon',
                    },
                    className
                )}
                ref={ref}
                {...motionProps}
                {...props}
            />
        )
    }
)
Button.displayName = 'Button'

export { Button }
