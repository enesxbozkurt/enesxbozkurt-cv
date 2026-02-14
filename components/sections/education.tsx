'use client'

import { Section } from '@/components/ui/section'
import { Card } from '@/components/ui/card'
import { formatDateRange } from '@/lib/utils'
import { BookOpen, Calendar, GraduationCap } from 'lucide-react'

interface EducationItem {
    id: string
    institution: string
    degree: string
    field?: string
    start_date: string
    end_date?: string | null
    description?: string
}

interface EducationProps {
    education: EducationItem[]
}

export function Education({ education }: EducationProps) {
    if (!education || education.length === 0) return null

    return (
        <Section id="education">
            <div className="flex flex-col items-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
                    Academic <span className="text-primary">Background</span>
                </h2>
                <div className="w-20 h-1 bg-primary rounded-full" />
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
                {education.map((edu) => (
                    <Card key={edu.id} className="p-8 group hover:border-primary/50 transition-colors">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                            <div className="flex gap-4">
                                <div className="hidden md:flex w-12 h-12 rounded-lg bg-primary/10 items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                                    <GraduationCap className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors">
                                        {edu.degree}
                                    </h3>
                                    <div className="flex items-center gap-2 text-lg text-muted mt-1">
                                        <BookOpen className="w-4 h-4 md:hidden" />
                                        {edu.field}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-primary font-medium bg-primary/5 px-4 py-2 rounded-full w-fit">
                                <Calendar className="w-4 h-4" />
                                {formatDateRange(edu.start_date, edu.end_date || null)}
                            </div>
                        </div>

                        <div className="md:pl-16">
                            <p className="text-lg text-white font-medium mb-3">{edu.institution}</p>

                            {edu.description && (
                                <p className="text-muted leading-relaxed whitespace-pre-wrap">
                                    {edu.description}
                                </p>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </Section>
    )
}
