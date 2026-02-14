import { z } from 'zod'

export const experienceSchema = z.object({
    id: z.string().optional(),
    company: z.string().min(2, 'Company name is required'),
    position: z.string().min(2, 'Position is required'),
    location: z.string().optional(),
    start_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid start date",
    }),
    end_date: z.string().nullable().optional(),
    description: z.string().optional(),
    is_current: z.boolean().default(false),
}).refine((data) => {
    if (!data.is_current && !data.end_date) {
        return false
    }
    if (data.end_date && new Date(data.start_date) > new Date(data.end_date)) {
        return false
    }
    return true
}, {
    message: "End date must be after start date and is required if not current",
    path: ["end_date"],
})

export type ExperienceFormValues = z.infer<typeof experienceSchema>
