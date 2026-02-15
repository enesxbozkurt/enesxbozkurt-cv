'use server'

import { createClient } from '@/lib/supabase/server'
import { skillSchema, SkillFormValues } from '@/lib/validators/skill'
import { revalidatePath } from 'next/cache'

export async function upsertSkill(data: SkillFormValues) {
    const supabase = await createClient()

    const result = skillSchema.safeParse(data)
    if (!result.success) return { error: 'Invalid data' }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    const payload = {
        user_id: user.id,
        name: data.name,
        category: data.category,
        proficiency_level: data.proficiency_level,
    }

    try {
        if (data.id) {
            const { error } = await supabase
                .from('skills')
                .update(payload)
                .eq('id', data.id)
                .eq('user_id', user.id)
            if (error) throw error
        } else {
            const { error } = await supabase
                .from('skills')
                .insert(payload)
            if (error) throw error
        }

        revalidatePath('/dashboard/skills')
        revalidatePath('/dashboard')
        revalidatePath('/')
        return { success: true }
    } catch (error: any) {
        return { error: error.message }
    }
}

export async function deleteSkill(id: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    try {
        const { error } = await supabase
            .from('skills')
            .delete()
            .eq('id', id)
            .eq('user_id', user.id)
        if (error) throw error

        revalidatePath('/dashboard/skills')
        return { success: true }
    } catch (error: any) {
        return { error: error.message }
    }
}
