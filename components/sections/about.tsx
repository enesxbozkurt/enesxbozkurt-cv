'use client'

import { Section } from '@/components/ui/section'
import { Card } from '@/components/ui/card'
import { MapPin, User, Code, Terminal } from 'lucide-react'

interface AboutProps {
    bio?: string
    location?: string
}

export function About({ bio, location }: AboutProps) {
    if (!bio) return null

    return (
        <Section id="about">
            <div className="grid md:grid-cols-12 gap-12 items-center">

                {/* Text Content */}
                <div className="md:col-span-7 space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center gap-3">
                        <User className="text-primary w-8 h-8" />
                        About Me
                    </h2>

                    <div className="prose prose-invert max-w-none text-muted text-lg leading-relaxed">
                        <p className="whitespace-pre-wrap">{bio}</p>
                    </div>

                    {location && (
                        <div className="flex items-center gap-2 text-primary/80 mt-4 bg-primary/5 w-fit px-4 py-2 rounded-full border border-primary/20">
                            <MapPin className="w-5 h-5" />
                            <span>{location}</span>
                        </div>
                    )}
                </div>

                {/* Stats / Visual Card */}
                <div className="md:col-span-5">
                    <Card className="p-8 border-primary/20 bg-gradient-to-br from-panel to-black relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Terminal className="w-48 h-48 text-primary" />
                        </div>

                        <h3 className="text-xl font-bold text-gray-200 mb-6">Quick Stats</h3>

                        <div className="space-y-4 relative z-10">
                            <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                <span className="text-muted">Experience</span>
                                <span className="text-primary font-bold">3+ Years</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                <span className="text-muted">Projects</span>
                                <span className="text-primary font-bold">5+ Delivered</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                <span className="text-muted">Clients</span>
                                <span className="text-primary font-bold">Global</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted">Commitment</span>
                                <span className="text-primary font-bold">Full-time</span>
                            </div>
                        </div>

                        <div className="mt-8 pt-4 border-t border-white/5">
                            <div className="flex items-center gap-3 text-sm text-muted">
                                <Code className="w-4 h-4 text-primary" />
                                <span>Open to new opportunities</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </Section>
    )
}
