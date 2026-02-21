'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Download, Mail } from 'lucide-react'

interface HeroProps {
    name: string
    title: string
    tagline?: string
    avatarUrl?: string
    email?: string
}

export function Hero({ name, title, tagline, avatarUrl, email }: HeroProps) {
    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
            {/* Background glowing orbs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -z-10 animate-pulse-slow" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse-slow object-right-bottom" />

            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                <div className="flex flex-col items-center text-center">

                    {/* Avatar with glow ring */}
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 relative group"
                    >
                        {avatarUrl ? (
                            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-br from-primary via-transparent to-primary/50 animate-spin-slow">
                                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/40 transition-all duration-500" />
                                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-black bg-panel">
                                    <Image
                                        src={avatarUrl}
                                        alt={name}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-panel border-2 border-primary/30 flex items-center justify-center shadow-[0_0_30px_rgba(41,255,79,0.2)]">
                                <span className="text-4xl font-bold text-primary opacity-50">{name.charAt(0)}</span>
                            </div>
                        )}
                    </motion.div>

                    {/* Name & Title */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <h2 className="text-lg md:text-xl font-medium text-primary mb-2 tracking-wide uppercase">
                            Hello, I'm
                        </h2>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
                                {name}
                            </span>
                        </h1>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl text-muted font-light mb-6">
                            {title}
                        </h2>
                    </motion.div>

                    {/* Tagline */}
                    {tagline && (
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="text-lg md:text-xl text-muted/80 max-w-2xl mx-auto mb-10 leading-relaxed"
                        >
                            {tagline}
                        </motion.p>
                    )}

                    {/* CTAs */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="flex flex-wrap gap-4 justify-center"
                    >
                        {email && (
                            <Button size="lg" className="group" onClick={() => window.location.href = `mailto:${email}`}>
                                <Mail className="mr-2 h-4 w-4" />
                                Contact Me
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        )}
                        <Button variant="secondary" size="lg" asChild>
                            <a href="/Enes_Bozkurt_CV.pdf" download="Enes_Bozkurt_CV.pdf">
                                <Download className="mr-2 h-4 w-4" />
                                Download CV
                            </a>
                        </Button>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-xs text-muted uppercase tracking-widest">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
            </motion.div>
        </section>
    )
}
