import { z } from 'zod'

export const experienceSchema = z.object({
    company: z.string().min(2, 'Company name is required'),
    position: z.string().min(2, 'Position is required'),
    location: z.string().optional(),
    start_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid start date",
    }),
    end_date: z.string().nullable().optional(),
    description: z.string().optional(),
    is_current: z.boolean(),
})

export type ExperienceFormValues = z.infer<typeof experienceSchema>
