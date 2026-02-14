'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { educationSchema, EducationFormValues } from '@/lib/validators/education'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { upsertEducation } from '@/lib/actions/education'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

interface EducationModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    initialData?: EducationFormValues | null
}

export function EducationModal({ open, onOpenChange, initialData }: EducationModalProps) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const form = useForm<EducationFormValues>({
        resolver: zodResolver(educationSchema),
        defaultValues: initialData || {
            institution: '',
            degree: '',
            field: '',
            start_date: '',
            end_date: '',
            description: '',
            is_current: false,
        },
    })

    async function onSubmit(data: EducationFormValues) {
        setLoading(true)
        try {
            const result = await upsertEducation({ ...data, id: initialData?.id })
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success(initialData ? 'Education updated' : 'Education added')
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
                    <DialogTitle>{initialData ? 'Edit Education' : 'Add Education'}</DialogTitle>
                    <DialogDescription>Add your academic background.</DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Institution</label>
                        <Input {...form.register('institution')} placeholder="University name" />
                        {form.formState.errors.institution && (
                            <p className="text-xs text-red-400">{form.formState.errors.institution.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Degree</label>
                            <Input {...form.register('degree')} placeholder="BSc, MSc, etc." />
                            {form.formState.errors.degree && (
                                <p className="text-xs text-red-400">{form.formState.errors.degree.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Field of Study</label>
                            <Input {...form.register('field')} placeholder="Computer Science" />
                        </div>
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
                            id="edu_is_current"
                            className="w-4 h-4 rounded border-white/10 bg-black text-primary focus:ring-primary/50"
                        />
                        <label htmlFor="edu_is_current" className="text-sm font-medium">I currently study here</label>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <Textarea
                            {...form.register('description')}
                            placeholder="Notable achievements, GPS, etc."
                            className="min-h-[100px]"
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
