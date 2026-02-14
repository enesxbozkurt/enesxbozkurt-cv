'use server'

import { createClient } from '@/lib/supabase/server'
import { projectSchema, ProjectFormValues } from '@/lib/validators/project'
import { revalidatePath } from 'next/cache'

export async function upsertProject(data: ProjectFormValues) {
    const supabase = await createClient()

    // Validate
    const result = projectSchema.safeParse(data)
    if (!result.success) {
        return { error: 'Invalid data' }
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    // Convert comma-separated string to array
    const techStackArray = data.tech_stack.split(',').map(t => t.trim()).filter(Boolean)

    // Prepare payload
    const payload = {
        user_id: user.id,
        title: data.title,
        description: data.description,
        tech_stack: techStackArray,
        url: data.live_url || null,
        github_url: data.repo_url || null,
        image_url: data.image_url || null,
        // order_no: data.order_no // If schema has it
    }

    try {
        if (data.id) {
            const { error } = await supabase
                .from('projects')
                .update(payload)
                .eq('id', data.id)
                .eq('user_id', user.id)
            if (error) throw error
        } else {
            const { error } = await supabase
                .from('projects')
                .insert(payload)
            if (error) throw error
        }

        revalidatePath('/dashboard/projects')
        revalidatePath('/dashboard')
        revalidatePath('/')
        return { success: true }
    } catch (error: any) {
        return { error: error.message }
    }
}

export async function deleteProject(id: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    try {
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id)
            .eq('user_id', user.id)

        if (error) throw error

        revalidatePath('/dashboard/projects')
        revalidatePath('/dashboard')
        revalidatePath('/')
        return { success: true }
    } catch (error: any) {
        return { error: error.message }
    }
}
