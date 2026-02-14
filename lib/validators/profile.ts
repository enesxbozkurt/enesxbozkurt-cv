import { z } from 'zod'

export const profileSchema = z.object({
    full_name: z.string().min(2, 'Name must be at least 2 characters'),
    title: z.string().min(2, 'Title must be at least 2 characters'),
    bio: z.string().optional(),
    location: z.string().optional(),
    avatar_url: z.string().url().optional().or(z.literal('')),
    email: z.string().email().optional().or(z.literal('')),
    linkedin: z.string().url().optional().or(z.literal('')),
    github: z.string().url().optional().or(z.literal('')),
    website: z.string().url().optional().or(z.literal('')),
})

export type ProfileFormValues = z.infer<typeof profileSchema>
