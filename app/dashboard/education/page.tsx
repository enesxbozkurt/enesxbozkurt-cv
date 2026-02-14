import { createClient } from '@/lib/supabase/server'
import { EducationList } from '@/components/dashboard/EducationList'
import { redirect } from 'next/navigation'

export default async function EducationPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/login')

    const { data: education } = await supabase
        .from('education')
        .select('*')
        .eq('user_id', user.id)
        .order('start_date', { ascending: false })

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">Education</h2>
                    <p className="text-muted">
                        Manage your academic background.
                    </p>
                </div>
            </div>

            <EducationList initialData={education || []} />
        </div>
    )
}
