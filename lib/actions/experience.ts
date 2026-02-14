'use server'

import { createClient } from '@/lib/supabase/server'
import { experienceSchema, ExperienceFormValues } from '@/lib/validators/experience'
import { revalidatePath } from 'next/cache'

export async function upsertExperience(data: ExperienceFormValues & { id?: string }) {
    const supabase = await createClient()

    // Validate
    const result = experienceSchema.safeParse(data)
    if (!result.success) {
        return { error: 'Invalid data' }
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    // Prepare payload
    const payload = {
        user_id: user.id,
        company: data.company,
        position: data.position,
        location: data.location,
        start_date: data.start_date,
        end_date: data.is_current ? null : data.end_date,
        description: data.description,
    }

    try {
        if (data.id) {
            // Update
            const { error } = await supabase
                .from('experiences')
                .update(payload)
                .eq('id', data.id)
                .eq('user_id', user.id)
            if (error) throw error
        } else {
            // Insert
            const { error } = await supabase
                .from('experiences')
                .insert(payload)
            if (error) throw error
        }

        revalidatePath('/dashboard/experience')
        revalidatePath('/dashboard')
        revalidatePath('/')
        return { success: true }
    } catch (error: any) {
        return { error: error.message }
    }
}

export async function deleteExperience(id: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    try {
        const { error } = await supabase
            .from('experiences')
            .delete()
            .eq('id', id)
            .eq('user_id', user.id)

        if (error) throw error

        revalidatePath('/dashboard/experience')
        revalidatePath('/dashboard')
        revalidatePath('/')
        return { success: true }
    } catch (error: any) {
        return { error: error.message }
    }
}
