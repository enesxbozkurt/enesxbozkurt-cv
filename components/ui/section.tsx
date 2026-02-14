'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionProps {
    id?: string
    className?: string
    children: React.ReactNode
    delay?: number
}

export function Section({ id, className, children, delay = 0 }: SectionProps) {
    return (
        <section
            id={id}
            className={cn('py-24 sm:py-32 relative', className)}
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay, ease: "easeOut" }}
                className="container mx-auto px-4 sm:px-6"
            >
                {children}
            </motion.div>
        </section>
    )
}
