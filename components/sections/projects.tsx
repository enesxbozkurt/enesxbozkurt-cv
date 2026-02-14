'use client'

import Image from 'next/image'
import { Section } from '@/components/ui/section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github, Code2, Layers } from 'lucide-react'
import { motion } from 'framer-motion'

interface ProjectItem {
    id: string
    title: string
    description: string
    tech_stack: string[]
    url?: string
    github_url?: string
    image_url?: string
}

interface ProjectsProps {
    projects: ProjectItem[]
}

export function Projects({ projects }: ProjectsProps) {
    if (!projects || projects.length === 0) return null

    return (
        <Section id="projects" className="bg-panel/10">
            <div className="flex flex-col items-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
                    Featured <span className="text-primary">Projects</span>
                </h2>
                <div className="w-20 h-1 bg-primary rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                        <Card className="flex flex-col h-full group border-border/50 bg-panel/50 hover:bg-panel transition-colors">
                            <div className="relative w-full h-48 overflow-hidden rounded-t-lg bg-black/50">
                                {project.image_url ? (
                                    <Image
                                        src={project.image_url}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-muted/20">
                                        <Layers className="w-16 h-16" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent opacity-80" />
                            </div>

                            <CardHeader className="relative z-10 -mt-12">
                                <div className="flex items-center justify-between mb-2">
                                    <CardTitle className="text-xl md:text-2xl group-hover:text-primary transition-colors">
                                        {project.title}
                                    </CardTitle>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                        {project.github_url && (
                                            <a
                                                href={project.github_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 rounded-full bg-black/50 hover:bg-primary hover:text-bg text-white transition-colors"
                                            >
                                                <Github className="w-4 h-4" />
                                            </a>
                                        )}
                                        {project.url && (
                                            <a
                                                href={project.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 rounded-full bg-black/50 hover:bg-primary hover:text-bg text-white transition-colors"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <CardDescription className="text-base line-clamp-3 leading-relaxed">
                                    {project.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="flex-1 flex flex-col justify-end gap-6">
                                <div className="flex flex-wrap gap-2">
                                    {project.tech_stack.map((tech, i) => (
                                        <Badge
                                            key={i}
                                            variant="secondary"
                                            className="bg-primary/5 text-primary/80 border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors"
                                        >
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </Section>
    )
}
