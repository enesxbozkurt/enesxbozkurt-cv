import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

export function formatDate(date: string | Date, format: 'short' | 'long' = 'short'): string {
    const d = typeof date === 'string' ? new Date(date) : date

    if (format === 'long') {
        return d.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short'
    })
}

export function formatDateRange(
    startDate: string | Date,
    endDate: string | Date | null,
    format: 'short' | 'long' = 'short'
): string {
    const start = formatDate(startDate, format)

    if (!endDate) {
        return `${start} - Present`
    }

    const end = formatDate(endDate, format)
    return `${start} - ${end}`
}
