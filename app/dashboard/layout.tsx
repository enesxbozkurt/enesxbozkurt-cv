import { DashboardSidebar } from '@/components/dashboard/Sidebar'
import { DashboardHeader } from '@/components/dashboard/Header'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    let profile = null
    if (user) {
        const { data } = await supabase
            .from('profiles')
            .select('name, avatar_url')
            .eq('id', user.id)
            .single()
        profile = data
    }

    return (
        <div className="min-h-screen bg-bg">
            <DashboardSidebar />
            <DashboardHeader user={profile} />

            <main className="md:pl-64 pt-6 px-6 pb-20">
                <div className="mx-auto max-w-6xl">
                    {children}
                </div>
            </main>
        </div>
    )
}
