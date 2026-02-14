import { DashboardSidebar } from '@/components/dashboard/Sidebar'
import { DashboardHeader } from '@/components/dashboard/Header'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-bg">
            <DashboardSidebar />
            <DashboardHeader />

            <main className="md:pl-64 pt-6 px-6 pb-20">
                <div className="mx-auto max-w-6xl">
                    {children}
                </div>
            </main>
        </div>
    )
}
