import { z } from 'zod'

export const SKILL_CATEGORIES = [
    'Frontend',
    'Backend',
    'Database',
    'Tools',
    'Other'
] as const

export const skillSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, 'Skill name is required'),
    category: z.enum(['Frontend', 'Backend', 'Database', 'Tools', 'Other']),
    level: z.number().min(0).max(100).optional(), // 0-100 placeholder
})

export type SkillFormValues = z.infer<typeof skillSchema>
