'use server'

import { createClient } from '@/lib/supabase/server'
import { profileSchema, ProfileFormValues } from '@/lib/validators/profile'
import { revalidatePath } from 'next/cache'

export async function updateProfile(data: ProfileFormValues) {
    const supabase = await createClient()

    // Validate data
    const result = profileSchema.safeParse(data)
    if (!result.success) {
        return { error: 'Invalid data' }
    }

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Unauthorized' }
    }

    try {
        // Check if profile exists
        const { data: existingProfile } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', user.id)
            .single()

        const payload: any = {
            name: data.full_name,
            title: data.title,
            bio: data.bio,
            location: data.location,
            avatar_url: data.avatar_url,
            email: data.email, // Note: This updates the profile display email, not auth email
            linkedin: data.linkedin,
            github: data.github,
            website: data.website,
            updated_at: new Date().toISOString(),
        }

        let error;

        if (existingProfile) {
            // Update existing profile
            const result = await supabase
                .from('profiles')
                .update(payload)
                .eq('id', user.id)
            error = result.error
        } else {
            // Create new profile
            // Generate basic slug
            const slug = data.full_name
                ? data.full_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Math.random().toString(36).substring(2, 7)
                : `user-${Math.random().toString(36).substring(2, 7)}`

            payload.id = user.id
            payload.slug = slug
            payload.is_public = false // Default to private

            const result = await supabase
                .from('profiles')
                .insert(payload)
            error = result.error
        }

        if (error) throw error

        revalidatePath('/dashboard/profile')
        revalidatePath('/dashboard')
        revalidatePath('/') // Update public page too

        return { success: true }
    } catch (error: any) {
        console.error('Profile update error:', error)
        return { error: error.message || 'Failed to update profile' }
    }
}
