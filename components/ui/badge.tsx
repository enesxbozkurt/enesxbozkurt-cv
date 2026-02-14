import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'secondary' | 'outline'
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
    return (
        <div
            className={cn(
                'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all duration-200',
                {
                    'bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20':
                        variant === 'default',
                    'bg-panel text-text border border-border hover:border-primary':
                        variant === 'secondary',
                    'border border-primary text-primary hover:bg-primary hover:text-bg':
                        variant === 'outline',
                },
                className
            )}
            {...props}
        />
    )
}

export { Badge }
