'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { settingsSchema, SettingsFormValues } from '@/lib/validators/settings'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { updateSettings } from '@/lib/actions/settings'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Loader2, Globe, Lock } from 'lucide-react'
import { Switch } from '@/components/ui/switch'

interface SettingsFormProps {
    initialData: SettingsFormValues
}

export function SettingsForm({ initialData }: SettingsFormProps) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(settingsSchema),
        defaultValues: initialData,
    })

    const isPublic = form.watch('is_public')

    async function onSubmit(data: SettingsFormValues) {
        setLoading(true)
        try {
            const result = await updateSettings(data)
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success('Settings updated successfully')
                router.refresh()
            }
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    // You might need to install Switch component from shadcn/ui or create it.
    // Since I don't have it in the file list, I'll assume standard checkbox styled or basic switch.
    // Wait, the user said "Toggle Public / Private". I'll implement a custom switch style if needed or use a button.
    // For now, I'll use a styled checkbox wrapper.

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card className="bg-panel border-border">
                <CardHeader>
                    <CardTitle className="text-white">General Settings</CardTitle>
                    <CardDescription>Configure your CV visibility and URL.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-white/5">
                        <div className="space-y-0.5">
                            <label className="text-base font-medium text-white flex items-center gap-2">
                                {isPublic ? <Globe className="w-4 h-4 text-primary" /> : <Lock className="w-4 h-4 text-muted" />}
                                Public Visibility
                            </label>
                            <p className="text-sm text-muted">
                                {isPublic
                                    ? "Your CV is currently visible to everyone."
                                    : "Only you can see your CV."}
                            </p>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                {...form.register('is_public')}
                                className="w-6 h-6 rounded border-white/10 bg-black text-primary focus:ring-primary/50"
                            // Note: Standard checkbox for now, easy to replace with Switch
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Public Slug</label>
                        <div className="flex items-center gap-2">
                            <span className="text-muted text-sm px-3 py-2 bg-white/5 rounded-md border border-white/5">
                                mycv.com/
                            </span>
                            <Input
                                {...form.register('slug')}
                                placeholder="my-name"
                                className="font-mono"
                            />
                        </div>
                        {form.formState.errors.slug && (
                            <p className="text-sm text-red-400">{form.formState.errors.slug.message}</p>
                        )}
                        <p className="text-xs text-muted">
                            This is the URL where your CV will be accessible.
                        </p>
                    </div>
                </CardContent>
                <CardFooter className="border-t border-white/5 pt-6">
                    <Button type="submit" disabled={loading} className="ml-auto">
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Settings
                    </Button>
                </CardFooter>
            </Card>

            <div className="border border-red-500/20 bg-red-500/5 rounded-lg p-6">
                <h3 className="text-red-400 font-medium mb-2">Danger Zone</h3>
                <p className="text-sm text-red-300/60 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button variant="destructive" type="button" disabled>
                    Delete Account
                </Button>
            </div>
        </form>
    )
}
