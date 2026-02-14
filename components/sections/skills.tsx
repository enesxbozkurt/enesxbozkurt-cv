'use client'

import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { Code2, Database, Layout, Terminal } from 'lucide-react'
import { motion } from 'framer-motion'

interface Skill {
    id: string
    name: string
    category?: string
}

interface SkillsProps {
    skills: Skill[]
}

const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
        case 'frontend': return <Layout className="w-5 h-5" />
        case 'backend': return <Database className="w-5 h-5" />
        case 'languages': return <Code2 className="w-5 h-5" />
        default: return <Terminal className="w-5 h-5" />
    }
}

export function Skills({ skills }: SkillsProps) {
    if (!skills || skills.length === 0) return null

    // Group skills by category
    const groupedSkills = skills.reduce((acc, skill) => {
        const category = skill.category || 'Other'
        if (!acc[category]) {
            acc[category] = []
        }
        acc[category].push(skill)
        return acc
    }, {} as Record<string, Skill[]>)

    return (
        <Section id="skills" className="bg-panel/20">
            <div className="flex flex-col items-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
                    Technical <span className="text-primary">Skills</span>
                </h2>
                <div className="w-20 h-1 bg-primary rounded-full" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(groupedSkills).map(([category, categorySkills], index) => (
                    <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="bg-panel border border-border rounded-xl p-6 hover:border-primary/50 transition-colors group"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-bg transition-colors">
                                {getCategoryIcon(category)}
                            </div>
                            <h3 className="text-xl font-bold text-white">
                                {category}
                            </h3>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {categorySkills.map((skill) => (
                                <Badge
                                    key={skill.id}
                                    variant="outline"
                                    className="bg-bg/50 border-white/10 hover:border-primary hover:text-primary transition-all py-2 px-3 text-sm"
                                >
                                    {skill.name}
                                </Badge>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </Section>
    )
}
