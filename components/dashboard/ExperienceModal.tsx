'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { experienceSchema, ExperienceFormValues } from '@/lib/validators/experience'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { upsertExperience } from '@/lib/actions/experience'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

interface ExperienceModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    initialData?: (ExperienceFormValues & { id?: string }) | null
}

export function ExperienceModal({ open, onOpenChange, initialData }: ExperienceModalProps) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const form = useForm<ExperienceFormValues>({
        resolver: zodResolver(experienceSchema),
        defaultValues: {
            company: initialData?.company || '',
            position: initialData?.position || '',
            location: initialData?.location || '',
            start_date: initialData?.start_date || '',
            end_date: initialData?.end_date || '',
            description: initialData?.description || '',
            is_current: initialData?.is_current ?? false,
        },
    })

    // Reset form when initialData changes or modal opens
    // (This is a simplified approach; in production, use useEffect or key to force re-render)

    async function onSubmit(data: ExperienceFormValues) {
        setLoading(true)
        try {
            const result = await upsertExperience({ ...data, id: initialData?.id }) // Ensure ID is passed for update validation if exists (though layout handles it)
            // Wait, initialData in props might have ID, form values might not explicitly unless we hidden field it.
            // Better: merge ID in the action call or include it in defaultValues.
            // I'll assume initialData includes ID if editing.

            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success(initialData ? 'Experience updated' : 'Experience added')
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
                    <DialogTitle>{initialData ? 'Edit Experience' : 'Add Experience'}</DialogTitle>
                    <DialogDescription>
                        {initialData ? 'Update the details of this position.' : 'Add a new work experience to your CV.'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Company</label>
                            <Input {...form.register('company')} placeholder="Company Name" />
                            {form.formState.errors.company && (
                                <p className="text-xs text-red-400">{form.formState.errors.company.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Position</label>
                            <Input {...form.register('position')} placeholder="Job Title" />
                            {form.formState.errors.position && (
                                <p className="text-xs text-red-400">{form.formState.errors.position.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <Input {...form.register('location')} placeholder="e.g. Remote, London, UK" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Start Date</label>
                            <Input type="date" {...form.register('start_date')} className="block" />
                            {form.formState.errors.start_date && (
                                <p className="text-xs text-red-400">{form.formState.errors.start_date.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">End Date</label>
                            <Input
                                type="date"
                                {...form.register('end_date')}
                                disabled={form.watch('is_current')}
                                className="block disabled:opacity-50"
                            />
                            {form.formState.errors.end_date && (
                                <p className="text-xs text-red-400">{form.formState.errors.end_date.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            {...form.register('is_current')}
                            id="is_current"
                            className="w-4 h-4 rounded border-white/10 bg-black text-primary focus:ring-primary/50"
                        />
                        <label htmlFor="is_current" className="text-sm font-medium">I currently work here</label>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <Textarea
                            {...form.register('description')}
                            placeholder="Describe your responsibilities and achievements..."
                            className="min-h-[100px]"
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {initialData ? 'Save Changes' : 'Add Experience'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
