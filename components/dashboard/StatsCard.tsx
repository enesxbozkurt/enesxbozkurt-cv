import { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatsCardProps {
    title: string
    value: string | number
    icon: LucideIcon
    description?: string
    trend?: string
}

export function StatsCard({ title, value, icon: Icon, description, trend }: StatsCardProps) {
    return (
        <Card className="border-border bg-panel hover:bg-item hover:border-primary/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted">
                    {title}
                </CardTitle>
                <Icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-white">{value}</div>
                {(description || trend) && (
                    <p className="text-xs text-muted mt-1">
                        {description}
                    </p>
                )}
            </CardContent>
        </Card>
    )
}
