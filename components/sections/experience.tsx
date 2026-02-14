'use client'

import { Section } from '@/components/ui/section'
import { Card } from '@/components/ui/card'
import { formatDateRange } from '@/lib/utils'
import { Briefcase, Calendar, MapPin } from 'lucide-react'

interface ExperienceItem {
    id: string
    company: string
    position: string
    description?: string
    start_date: string
    end_date?: string | null
    location?: string
}

interface ExperienceProps {
    experiences: ExperienceItem[]
}

export function Experience({ experiences }: ExperienceProps) {
    if (!experiences || experiences.length === 0) return null

    return (
        <Section id="experience">
            <div className="flex flex-col items-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
                    Work <span className="text-primary">Experience</span>
                </h2>
                <div className="w-20 h-1 bg-primary rounded-full" />
            </div>

            <div className="max-w-4xl mx-auto space-y-12 relative">
                {/* Continuous Vertical Line */}
                <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden md:block" />

                {experiences.map((exp, index) => (
                    <div key={exp.id} className="relative md:pl-20">
                        {/* Timeline Node */}
                        <div className="absolute left-[19px] top-6 w-4 h-4 rounded-full bg-bg border-2 border-primary shadow-[0_0_10px_rgba(41,255,79,0.5)] z-10 hidden md:block group-hover:scale-125 transition-transform" />

                        <Card className="p-8 group">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                                        {exp.position}
                                    </h3>
                                    <div className="flex items-center gap-2 text-lg text-primary/90 mt-1 font-medium">
                                        <Briefcase className="w-5 h-5" />
                                        {exp.company}
                                    </div>
                                </div>

                                <div className="flex flex-col items-start md:items-end gap-1 text-sm text-muted">
                                    <div className="flex items-center gap-2 bg-panel/50 px-3 py-1 rounded-full border border-white/5">
                                        <Calendar className="w-4 h-4 text-primary" />
                                        {formatDateRange(exp.start_date, exp.end_date || null)}
                                    </div>
                                    {exp.location && (
                                        <div className="flex items-center gap-2 px-3 py-1">
                                            <MapPin className="w-4 h-4" />
                                            {exp.location}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {exp.description && (
                                <div className="text-muted leading-relaxed whitespace-pre-wrap border-l-2 border-primary/10 pl-4">
                                    {exp.description}
                                </div>
                            )}
                        </Card>
                    </div>
                ))}
            </div>
        </Section>
    )
}
