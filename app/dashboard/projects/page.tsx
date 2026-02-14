import { createClient } from '@/lib/supabase/server'
import { ProjectList } from '@/components/dashboard/ProjectList'
import { redirect } from 'next/navigation'

export default async function ProjectsPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">Projects</h2>
                    <p className="text-muted">
                        Manage your portfolio projects.
                    </p>
                </div>
            </div>

            <ProjectList initialData={projects || []} />
        </div>
    )
}
