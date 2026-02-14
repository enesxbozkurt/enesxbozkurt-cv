import { z } from 'zod'

export const projectSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(2, 'Title is required'),
    description: z.string().min(10, 'Description needs to be longer'),
    tech_stack: z.string().min(1, 'Tech stack is required (comma separated)'), // Input string, converted to array later
    live_url: z.string().url().optional().or(z.literal('')),
    repo_url: z.string().url().optional().or(z.literal('')),
    image_url: z.string().url().optional().or(z.literal('')),
})

export type ProjectFormValues = z.infer<typeof projectSchema>
