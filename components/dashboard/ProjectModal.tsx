'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { projectSchema, ProjectFormValues } from '@/lib/validators/project'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { upsertProject } from '@/lib/actions/project'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

interface ProjectModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    initialData?: ProjectFormValues | null
}

export function ProjectModal({ open, onOpenChange, initialData }: ProjectModalProps) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema),
        defaultValues: initialData || {
            title: '',
            description: '',
            tech_stack: '',
            live_url: '',
            repo_url: '',
            image_url: '',
        },
    })

    async function onSubmit(data: ProjectFormValues) {
        setLoading(true)
        try {
            const result = await upsertProject({ ...data, id: initialData?.id })

            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success(initialData ? 'Project updated' : 'Project added')
                onOpenChange(false)
                router.refresh()
            }
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-panel border-border text-white sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{initialData ? 'Edit Project' : 'Add Project'}</DialogTitle>
                    <DialogDescription>
                        Showcase your best work.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Project Name</label>
                        <Input {...form.register('title')} placeholder="e.g. E-Commerce Platform" />
                        {form.formState.errors.title && (
                            <p className="text-xs text-red-400">{form.formState.errors.title.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <Textarea
                            {...form.register('description')}
                            placeholder="What does this project do?"
                            className="min-h-[100px]"
                        />
                        {form.formState.errors.description && (
                            <p className="text-xs text-red-400">{form.formState.errors.description.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Tech Stack</label>
                        <Input {...form.register('tech_stack')} placeholder="React, Node.js, Supabase (comma separated)" />
                        {form.formState.errors.tech_stack && (
                            <p className="text-xs text-red-400">{form.formState.errors.tech_stack.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Live URL</label>
                            <Input {...form.register('live_url')} placeholder="https://..." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Repo URL</label>
                            <Input {...form.register('repo_url')} placeholder="https://github.com/..." />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Cover Image URL</label>
                        <Input {...form.register('image_url')} placeholder="https://..." />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {initialData ? 'Save Changes' : 'Add Project'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
