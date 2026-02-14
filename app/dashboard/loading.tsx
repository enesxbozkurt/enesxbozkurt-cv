import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
    return (
        <div className="p-6 space-y-8 animate-in fade-in-50 duration-500">
            {/* Header Skeleton */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-4 w-48" />
                </div>
                <Skeleton className="h-10 w-32" />
            </div>

            {/* Grid Skeleton */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Skeleton className="h-40 rounded-xl bg-panel border border-white/5" />
                <Skeleton className="h-40 rounded-xl bg-panel border border-white/5" />
                <Skeleton className="h-40 rounded-xl bg-panel border border-white/5" />
            </div>

            {/* Content Skeleton */}
            <div className="space-y-4">
                <Skeleton className="h-[400px] w-full rounded-xl bg-panel border border-white/5" />
            </div>
        </div>
    )
}
