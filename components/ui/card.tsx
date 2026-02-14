import * as React from 'react'
import { cn } from '@/lib/utils'

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { hoverEffect?: boolean }
>(({ className, hoverEffect = true, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            'rounded-xl border border-border bg-panel text-text shadow-sm transition-all overflow-hidden relative group',
            hoverEffect && 'hover:border-primary/30 hover:shadow-[0_0_30px_rgba(41,255,79,0.1)] hover:-translate-y-1',
            className
        )}
        {...props}
    >
        {hoverEffect && (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        )}
        {props.children}
    </div>
))
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5 p-6 relative z-10', className)}
        {...props}
    />
))
Card.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            'text-2xl font-semibold leading-none tracking-tight text-white group-hover:text-primary transition-colors duration-300',
            className
        )}
        {...props}
    />
))
Card.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn('text-sm text-muted mb-4', className)}
        {...props}
    />
))
Card.displayName = 'CardDescription'

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0 relative z-10', className)} {...props} />
))
Card.displayName = 'CardContent'

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('flex items-center p-6 pt-0 relative z-10', className)}
        {...props}
    />
))
Card.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
