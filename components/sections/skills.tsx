'use client'

import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import {
    Code2,
    Database,
    Layout,
    Terminal,
    Globe,
    Server,
    Cpu,
    Layers,
    GitBranch,
    Github,
    Send,
    Lightbulb,
    Box,
    RefreshCcw,
    CheckCircle,
    Bug,
    Atom,
    Zap,
    FileType,
    Braces
} from 'lucide-react'
import { motion } from 'framer-motion'

interface Skill {
    id: string
    name: string
    category?: string
}

interface SkillsProps {
    skills: Skill[]
}

const getSkillIcon = (skillName: string) => {
    const name = skillName.toLowerCase()

    // Frontend
    if (name.includes('html')) return <FileType className="w-3.5 h-3.5" />
    if (name.includes('css')) return <Layout className="w-3.5 h-3.5" />
    if (name.includes('javascript')) return <Code2 className="w-3.5 h-3.5" />
    if (name.includes('typescript')) return <Code2 className="w-3.5 h-3.5" />
    if (name.includes('react')) return <Atom className="w-3.5 h-3.5" />
    if (name.includes('next.js')) return <Zap className="w-3.5 h-3.5" />
    if (name.includes('tailwind')) return <Layout className="w-3.5 h-3.5" />

    // Backend
    if (name.includes('node.js')) return <Server className="w-3.5 h-3.5" />
    if (name.includes('rest api')) return <Globe className="w-3.5 h-3.5" />
    if (name.includes('supabase')) return <Database className="w-3.5 h-3.5" />
    if (name.includes('.net')) return <Cpu className="w-3.5 h-3.5" />

    // Database
    if (name.includes('postgresql')) return <Database className="w-3.5 h-3.5" />
    if (name.includes('mssql')) return <Database className="w-3.5 h-3.5" />
    if (name.includes('entity framework')) return <Braces className="w-3.5 h-3.5" />

    // Tools
    if (name.includes('git') && !name.includes('github')) return <GitBranch className="w-3.5 h-3.5" />
    if (name.includes('github')) return <Github className="w-3.5 h-3.5" />
    if (name.includes('postman')) return <Send className="w-3.5 h-3.5" />

    // Other / Soft Skills
    if (name.includes('problem solving')) return <Lightbulb className="w-3.5 h-3.5" />
    if (name.includes('oop')) return <Box className="w-3.5 h-3.5" />
    if (name.includes('agile')) return <RefreshCcw className="w-3.5 h-3.5" />
    if (name.includes('testing')) return <CheckCircle className="w-3.5 h-3.5" />
    if (name.includes('debugging')) return <Bug className="w-3.5 h-3.5" />

    return <Terminal className="w-3.5 h-3.5" />
}

const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
        case 'frontend': return <Layout className="w-5 h-5" />
        case 'backend': return <Server className="w-5 h-5" />
        case 'database': return <Database className="w-5 h-5" />
        case 'tools': return <Terminal className="w-5 h-5" />
        default: return <Code2 className="w-5 h-5" />
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
                                    className="bg-bg/50 border-white/10 hover:border-primary transition-all py-2 px-3 text-sm flex items-center gap-2"
                                >
                                    <span className="text-primary/70 group-hover:text-primary transition-colors">
                                        {getSkillIcon(skill.name)}
                                    </span>
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
