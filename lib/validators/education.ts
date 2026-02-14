import { z } from 'zod'

export const educationSchema = z.object({
    id: z.string().optional(),
    institution: z.string().min(2, 'Institution is required'),
    degree: z.string().min(2, 'Degree is required'),
    field: z.string().optional(),
    start_date: z.string().min(1, 'Start date is required'), // Just year or date string
    end_date: z.string().optional().or(z.literal('')),
    description: z.string().optional(),
    is_current: z.boolean().default(false),
}).refine((data) => {
    if (!data.is_current && !data.end_date) return false
    return true
}, {
    message: "End date is required if not current",
    path: ["end_date"]
})

export type EducationFormValues = z.infer<typeof educationSchema>
