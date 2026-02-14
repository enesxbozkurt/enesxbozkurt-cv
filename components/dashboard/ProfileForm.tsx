'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileSchema, ProfileFormValues } from '@/lib/validators/profile'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { updateProfile } from '@/lib/actions/profile'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

interface ProfileFormProps {
    initialData: ProfileFormValues
}

export function ProfileForm({ initialData }: ProfileFormProps) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: initialData,
    })

    async function onSubmit(data: ProfileFormValues) {
        setLoading(true)
        try {
            const result = await updateProfile(data)
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success('Profile updated successfully')
                router.refresh()
            }
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-panel border-border">
                    <CardHeader>
                        <CardTitle className="text-white">Professional Info</CardTitle>
                        <CardDescription>Main details displayed on your hero section.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Full Name</label>
                            <Input {...form.register('full_name')} placeholder="e.g. John Doe" />
                            {form.formState.errors.full_name && (
                                <p className="text-sm text-red-400">{form.formState.errors.full_name.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Job Title</label>
                            <Input {...form.register('title')} placeholder="e.g. Senior Full Stack Developer" />
                            {form.formState.errors.title && (
                                <p className="text-sm text-red-400">{form.formState.errors.title.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Bio</label>
                            <Textarea {...form.register('bio')} placeholder="Short professional bio..." className="min-h-[120px]" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Location</label>
                            <Input {...form.register('location')} placeholder="e.g. San Francisco, CA" />
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card className="bg-panel border-border">
                        <CardHeader>
                            <CardTitle className="text-white">Contact & Socials</CardTitle>
                            <CardDescription>Where people can find you.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Public Email</label>
                                <Input {...form.register('email')} placeholder="contact@example.com" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">LinkedIn URL</label>
                                <Input {...form.register('linkedin')} placeholder="https://linkedin.com/in/..." />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">GitHub URL</label>
                                <Input {...form.register('github')} placeholder="https://github.com/..." />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Website URL</label>
                                <Input {...form.register('website')} placeholder="https://..." />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-panel border-border">
                        <CardHeader>
                            <CardTitle className="text-white">Avatar</CardTitle>
                            <CardDescription>Profile picture URL.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Avatar URL</label>
                                <Input {...form.register('avatar_url')} placeholder="https://..." />
                                <p className="text-xs text-muted">A direct link to your image. Storage upload coming soon.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="flex justify-end">
                <Button type="submit" disabled={loading} size="lg" className="w-full md:w-auto">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                </Button>
            </div>
        </form>
    )
}
