'use client'

import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Mail, Phone, Linkedin, Github, Globe, Send, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'

interface ContactProps {
    email?: string
    phone?: string
    linkedin?: string
    github?: string
    website?: string
}

export function Contact({ email, phone, linkedin, github, website }: ContactProps) {
    return (
        <Section id="contact" className="pb-32">
            <div className="flex flex-col items-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
                    Let's <span className="text-primary">Connect</span>
                </h2>
                <div className="w-20 h-1 bg-primary rounded-full" />
            </div>

            <div className="max-w-4xl mx-auto">
                <Card className="p-8 md:p-12 overflow-hidden relative">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />

                    <div className="grid md:grid-cols-2 gap-12 relative z-10">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                                <MessageSquare className="text-primary w-6 h-6" />
                                Get in Touch
                            </h3>
                            <p className="text-muted text-lg leading-relaxed">
                                I'm currently open to new opportunities and collaborations.
                                Whether you have a question or just want to say hi, I'll try my best to get back to you!
                            </p>

                            <div className="space-y-4 pt-4">
                                {email && (
                                    <a
                                        href={`mailto:${email}`}
                                        className="flex items-center gap-4 p-4 rounded-lg bg-panel border border-white/5 hover:border-primary/50 hover:bg-white/5 transition-all group"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted">Email</div>
                                            <div className="text-white font-medium">{email}</div>
                                        </div>
                                    </a>
                                )}

                                {phone && (
                                    <a
                                        href={`tel:${phone}`}
                                        className="flex items-center gap-4 p-4 rounded-lg bg-panel border border-white/5 hover:border-primary/50 hover:bg-white/5 transition-all group"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted">Phone</div>
                                            <div className="text-white font-medium">{phone}</div>
                                        </div>
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-white mb-6">Social Profiles</h3>

                            <div className="grid grid-cols-2 gap-4">
                                {linkedin && (
                                    <Button variant="outline" asChild className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-primary/10 hover:border-primary group">
                                        <a href={linkedin} target="_blank" rel="noopener noreferrer">
                                            <Linkedin className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                                            <span>LinkedIn</span>
                                        </a>
                                    </Button>
                                )}

                                {github && (
                                    <Button variant="outline" asChild className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-primary/10 hover:border-primary group">
                                        <a href={github} target="_blank" rel="noopener noreferrer">
                                            <Github className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                                            <span>GitHub</span>
                                        </a>
                                    </Button>
                                )}

                                {website && (
                                    <Button variant="outline" asChild className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-primary/10 hover:border-primary group lg:col-span-2">
                                        <a href={website} target="_blank" rel="noopener noreferrer">
                                            <Globe className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                                            <span>Website</span>
                                        </a>
                                    </Button>
                                )}
                            </div>

                            <Button className="w-full mt-6" size="lg" asChild>
                                <a href={`mailto:${email}`}>
                                    Send Message <Send className="ml-2 h-4 w-4" />
                                </a>
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </Section>
    )
}
