import { createClient } from '@/lib/supabase/server'
import { ProfileForm } from '@/components/dashboard/ProfileForm'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Fetch existing profile
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    // If no profile exists (edge case), providing empty defaults
    // In a real app we might create one here or in a callback
    const initialData = {
        full_name: profile?.name || '',
        title: profile?.title || '',
        bio: profile?.bio || '',
        location: profile?.location || '',
        avatar_url: profile?.avatar_url || '',
        email: profile?.email || '',
        linkedin: profile?.linkedin || '',
        github: profile?.github || '',
        website: profile?.website || '',
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-white">Profile Settings</h2>
                <p className="text-muted">
                    Manage your personal information and social links.
                </p>
            </div>

            <ProfileForm initialData={initialData} />
        </div>
    )
}
