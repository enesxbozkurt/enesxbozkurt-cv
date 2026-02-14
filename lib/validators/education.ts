import { z } from 'zod'

export const educationSchema = z.object({
    institution: z.string().min(1, 'Institution is required'),
    degree: z.string().min(1, 'Degree is required'),
    field: z.string().optional(),
    start_date: z.string().min(1, 'Start date is required'),
    end_date: z.string().optional(),
    description: z.string().optional(),
    is_current: z.boolean(),
})

export type EducationFormValues = z.infer<typeof educationSchema>
