import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'

export const getAdminStats = cache(async () => {
    const supabase = await createClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    // Parallel fetch for counts
    const [
        { count: experienceCount },
        { count: projectCount },
        { count: skillCount },
        { count: educationCount },
        { data: profile }
    ] = await Promise.all([
        supabase.from('experiences').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('projects').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('skills').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('education').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('profiles').select('is_public, updated_at').eq('id', user.id).single()
    ])

    return {
        counts: {
            experience: experienceCount || 0,
            projects: projectCount || 0,
            skills: skillCount || 0,
            education: educationCount || 0
        },
        profile: profile
    }
})
