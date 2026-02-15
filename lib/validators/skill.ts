import { z } from 'zod'

export const SKILL_CATEGORIES = [
    'Frontend',
    'Backend',
    'Database',
    'Tools',
    'Other'
] as const

export const PROFICIENCY_LEVELS = [
    'beginner',
    'intermediate',
    'advanced',
    'expert'
] as const

export const skillSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, 'Skill name is required'),
    category: z.enum(['Frontend', 'Backend', 'Database', 'Tools', 'Other']),
    proficiency_level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']),
})

export type SkillFormValues = z.infer<typeof skillSchema>
