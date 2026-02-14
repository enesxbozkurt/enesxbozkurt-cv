'use client'

import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export function DashboardHeader() {
    const router = useRouter()
    const supabase = createClient()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/login')
    }

    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center border-b border-white/5 bg-black/50 backdrop-blur-xl px-6 justify-between md:pl-72">
            <div className="md:hidden">
                {/* Mobile toggle placeholder - implemented in layout usually or separate component */}
                <span className="text-lg font-bold text-white">Admin Panel</span>
            </div>

            <div className="hidden md:block">
                {/* Breadcrumbs or Page Title placeholder */}
                <h1 className="text-sm font-medium text-muted">Dashboard Overview</h1>
            </div>

            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="sm"
                    className="hidden md:flex text-muted hover:text-white mr-2"
                    onClick={() => window.open('/', '_blank')}
                >
                    View Site
                </Button>

                <Button variant="ghost" size="icon" className="text-muted hover:text-primary">
                    <Bell className="h-5 w-5" />
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full border border-primary/20 hover:border-primary transition-colors">
                            <div className="h-full w-full rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                                A
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-panel border-border">
                        <DropdownMenuLabel className="text-white">My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem className="text-muted focus:text-white focus:bg-white/5 cursor-pointer">
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-muted focus:text-white focus:bg-white/5 cursor-pointer">
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem
                            className="text-red-400 focus:text-red-300 focus:bg-red-500/10 cursor-pointer"
                            onClick={handleLogout}
                        >
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
