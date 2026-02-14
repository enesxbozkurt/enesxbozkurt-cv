'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
    LayoutDashboard,
    UserCircle,
    Briefcase,
    FolderOpen,
    GraduationCap,
    Wrench,
    Settings,
    LogOut
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const navItems = [
    { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/dashboard/profile', label: 'Profile', icon: UserCircle },
    { href: '/dashboard/experience', label: 'Experience', icon: Briefcase },
    { href: '/dashboard/projects', label: 'Projects', icon: FolderOpen },
    { href: '/dashboard/education', label: 'Education', icon: GraduationCap },
    { href: '/dashboard/skills', label: 'Skills', icon: Wrench },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export function DashboardSidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/login')
    }

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-border bg-panel transition-transform md:translate-x-0">
            <div className="flex h-full flex-col">
                {/* Logo Area */}
                <div className="flex h-16 items-center border-b border-border px-6">
                    <span className="text-xl font-bold bg-gradient-to-r from-white to-muted bg-clip-text text-transparent">
                        Admin<span className="text-primary">Panel</span>
                    </span>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 group relative",
                                    isActive
                                        ? "text-primary bg-primary/10"
                                        : "text-muted hover:bg-white/5 hover:text-white"
                                )}
                            >
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full shadow-[0_0_10px_rgba(41,255,79,0.5)]" />
                                )}
                                <Icon className={cn("h-5 w-5 transition-colors", isActive ? "text-primary" : "text-muted-foreground group-hover:text-white")} />
                                {item.label}
                            </Link>
                        )
                    })}
                </div>

                {/* Footer / Logout */}
                <div className="border-t border-border p-4">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-muted hover:text-red-400 hover:bg-red-500/10"
                        onClick={handleLogout}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log Out
                    </Button>
                </div>
            </div>
        </aside>
    )
}
