'use server'

import { createClient } from '@/lib/supabase/server'
import { educationSchema, EducationFormValues } from '@/lib/validators/education'
import { revalidatePath } from 'next/cache'

export async function upsertEducation(data: EducationFormValues) {
    const supabase = await createClient()

    const result = educationSchema.safeParse(data)
    if (!result.success) return { error: 'Invalid data' }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    const payload = {
        user_id: user.id,
        institution: data.institution,
        degree: data.degree,
        field_of_study: data.field,
        start_date: data.start_date,
        end_date: data.is_current ? null : data.end_date,
        description: data.description,
    }

    try {
        if (data.id) {
            const { error } = await supabase
                .from('education')
                .update(payload)
                .eq('id', data.id)
                .eq('user_id', user.id)
            if (error) throw error
        } else {
            const { error } = await supabase
                .from('education')
                .insert(payload)
            if (error) throw error
        }

        revalidatePath('/dashboard/education')
        revalidatePath('/dashboard')
        revalidatePath('/')
        return { success: true }
    } catch (error: any) {
        return { error: error.message }
    }
}

export async function deleteEducation(id: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    try {
        const { error } = await supabase
            .from('education')
            .delete()
            .eq('id', id)
            .eq('user_id', user.id)
        if (error) throw error

        revalidatePath('/dashboard/education')
        return { success: true }
    } catch (error: any) {
        return { error: error.message }
    }
}
