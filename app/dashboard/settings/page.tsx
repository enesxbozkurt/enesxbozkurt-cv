import { createClient } from '@/lib/supabase/server'
import { SettingsForm } from '@/components/dashboard/SettingsForm'
import { redirect } from 'next/navigation'

export default async function SettingsPage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('slug, is_public')
        .eq('id', user.id)
        .single()

    const initialData = {
        slug: profile?.slug || '',
        is_public: profile?.is_public || false,
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-white">Settings</h2>
                <p className="text-muted">
                    Manage your CV visibility and account settings.
                </p>
            </div>

            <SettingsForm initialData={initialData} />
        </div>
    )
}
