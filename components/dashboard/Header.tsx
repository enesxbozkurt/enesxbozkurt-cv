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

export interface DashboardHeaderProps {
    user?: {
        name: string;
        avatar_url: string | null;
    } | null;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
    const router = useRouter()
    const supabase = createClient()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/login')
    }

    const initial = user?.name?.charAt(0) || 'A'

    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center border-b border-white/5 bg-black/50 backdrop-blur-xl px-6 justify-between md:pl-72">
            <div className="md:hidden">
                <span className="text-lg font-bold text-white">Admin Panel</span>
            </div>

            <div className="hidden md:block">
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
                        <Button variant="ghost" className="relative h-9 w-9 rounded-full border border-primary/20 hover:border-primary transition-colors overflow-hidden p-0">
                            {user?.avatar_url ? (
                                <img
                                    src={user.avatar_url}
                                    alt={user.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="h-full w-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                                    {initial}
                                </div>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-panel border-border">
                        <DropdownMenuLabel className="text-white">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">{user?.name || 'Account'}</p>
                                <p className="text-xs leading-none text-muted-foreground mr-2">My Account</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem
                            className="text-muted focus:text-white focus:bg-white/5 cursor-pointer"
                            onClick={() => router.push('/dashboard/profile')}
                        >
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-muted focus:text-white focus:bg-white/5 cursor-pointer"
                            onClick={() => router.push('/dashboard/settings')}
                        >
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
