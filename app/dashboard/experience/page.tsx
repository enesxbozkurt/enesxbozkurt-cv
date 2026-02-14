import { createClient } from '@/lib/supabase/server'
import { ExperienceList } from '@/components/dashboard/ExperienceList'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function ExperiencePage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: experiences } = await supabase
        .from('experiences')
        .select('*')
        .eq('user_id', user.id)
        .order('start_date', { ascending: false })

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">Experience</h2>
                    <p className="text-muted">
                        Manage your work history and positions.
                    </p>
                </div>
            </div>

            <ExperienceList initialData={experiences || []} />
        </div>
    )
}
