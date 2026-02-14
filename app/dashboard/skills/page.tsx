import { createClient } from '@/lib/supabase/server'
import { SkillList } from '@/components/dashboard/SkillList'
import { redirect } from 'next/navigation'

export default async function SkillsPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/login')

    const { data: skills } = await supabase
        .from('skills')
        .select('*')
        .eq('user_id', user.id)
        .order('name')

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">Skills</h2>
                    <p className="text-muted">
                        Manage your technical expertise.
                    </p>
                </div>
            </div>

            <SkillList initialData={skills || []} />
        </div>
    )
}
