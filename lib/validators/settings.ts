import { z } from 'zod'

export const settingsSchema = z.object({
    slug: z.string()
        .min(3, 'Slug must be at least 3 characters')
        .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
    is_public: z.boolean(),
})

export type SettingsFormValues = z.infer<typeof settingsSchema>
