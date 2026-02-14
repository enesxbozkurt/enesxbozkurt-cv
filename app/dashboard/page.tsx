import { Suspense } from 'react'
import { Briefcase, FolderOpen, Wrench, GraduationCap, Eye, Globe } from 'lucide-react'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { getAdminStats } from '@/lib/data/admin'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
    const stats = await getAdminStats()

    if (!stats) return null

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard</h2>
                <p className="text-muted">
                    Welcome back! Here's an overview of your CV content.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Experience"
                    value={stats.counts.experience}
                    icon={Briefcase}
                    description="Career positions"
                />
                <StatsCard
                    title="Projects"
                    value={stats.counts.projects}
                    icon={FolderOpen}
                    description="Showcased projects"
                />
                <StatsCard
                    title="Skills"
                    value={stats.counts.skills}
                    icon={Wrench}
                    description="Technical competencies"
                />
                <StatsCard
                    title="Public Status"
                    value={stats.profile?.is_public ? "Public" : "Private"}
                    icon={Globe}
                    description={stats.profile?.updated_at ? `Updated ${formatDistanceToNow(new Date(stats.profile.updated_at), { addSuffix: true })}` : 'Not updated yet'}
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 bg-panel border-border border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-white">Quick Actions</h3>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <Button asChild variant="outline" className="h-24 flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5">
                            <Link href="/dashboard/experience">
                                <Briefcase className="h-6 w-6 text-primary" />
                                <span>Add Experience</span>
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="h-24 flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5">
                            <Link href="/dashboard/projects">
                                <FolderOpen className="h-6 w-6 text-primary" />
                                <span>Add Project</span>
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="col-span-3 bg-panel border-border border rounded-xl p-6">
                    <h3 className="font-semibold text-white mb-4">System Status</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted">Supabase Connection</span>
                            <span className="text-primary flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                Connected
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted">Last Deployment</span>
                            <span className="text-white">Just now</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
