'use server'

import { createClient } from '@/lib/supabase/server'
import { settingsSchema, SettingsFormValues } from '@/lib/validators/settings'
import { revalidatePath } from 'next/cache'

export async function updateSettings(data: SettingsFormValues) {
    const supabase = await createClient()

    // Validate data
    const result = settingsSchema.safeParse(data)
    if (!result.success) {
        return { error: 'Invalid data' }
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    // Check slug uniqueness if changed
    // We can't easily check "if changed" without fetching first, 
    // but a unique constraint on DB would throw error.
    // Let's rely on DB error or manual check.

    // Check if slug is taken by ANOTHER user
    const { data: existing } = await supabase
        .from('profiles')
        .select('id')
        .eq('slug', data.slug)
        .neq('id', user.id)
        .single()

    if (existing) {
        return { error: 'Slug is already taken' }
    }

    try {
        const { error } = await supabase
            .from('profiles')
            .update({
                slug: data.slug,
                is_public: data.is_public,
                updated_at: new Date().toISOString(),
            })
            .eq('id', user.id)

        if (error) throw error

        revalidatePath('/dashboard/settings')
        revalidatePath('/dashboard')
        revalidatePath('/')

        return { success: true }
    } catch (error: any) {
        return { error: error.message }
    }
}
