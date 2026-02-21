'use client'

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

// Navigation items
const navItems = [
    { name: "About", to: "about" },
    { name: "Skills", to: "skills" },
    { name: "Experience", to: "experience" },
    { name: "Projects", to: "projects" },
    { name: "Education", to: "education" },
    { name: "Contact", to: "contact" },
]



export function Navbar({ name }: { name: string }) {
    const [scrolled, setScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState("")

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)

            // Simple active section detection
            const sections = navItems.map(item => document.getElementById(item.to))
            const scrollPosition = window.scrollY + 200

            for (const section of sections) {
                if (section &&
                    section.offsetTop <= scrollPosition &&
                    (section.offsetTop + section.offsetHeight) > scrollPosition) {
                    setActiveSection(section.id)
                }
            }
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            const y = element.getBoundingClientRect().top + window.pageYOffset - 80
            window.scrollTo({ top: y, behavior: 'smooth' })
            setActiveSection(id)
        }
    }

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled ? "bg-bg/80 backdrop-blur-md border-b border-white/5 py-3" : "py-5 bg-transparent"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <div
                    className="text-xl font-bold tracking-tighter group"
                >
                    <span className="text-white group-hover:text-primary transition-colors">&lt;</span>
                    {name?.split(' ')[0] || 'Enes'}
                    <span className="text-primary">/</span>
                    {name?.split(' ')[1] || 'Bozkurt'}
                    <span className="text-white group-hover:text-primary transition-colors">&gt;</span>
                </div>

                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => scrollToSection(item.to)}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary relative group",
                                activeSection === item.to ? "text-primary" : "text-muted"
                            )}
                        >
                            {item.name}
                            <span className={cn(
                                "absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full",
                                activeSection === item.to ? "w-full" : ""
                            )} />
                        </button>
                    ))}
                </nav>
            </div>
        </motion.header>
    )
}
