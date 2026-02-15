'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { skillSchema, SkillFormValues, SKILL_CATEGORIES, PROFICIENCY_LEVELS } from '@/lib/validators/skill'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { upsertSkill } from '@/lib/actions/skill'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SkillModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    initialData?: (SkillFormValues & { id?: string }) | null
    defaultCategory?: string
}

export function SkillModal({ open, onOpenChange, initialData, defaultCategory }: SkillModalProps) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const form = useForm<SkillFormValues>({
        resolver: zodResolver(skillSchema),
        defaultValues: {
            name: initialData?.name || '',
            category: initialData?.category || (defaultCategory as any) || 'Frontend',
            proficiency_level: initialData?.proficiency_level || 'intermediate',
        },
    })

    async function onSubmit(data: SkillFormValues) {
        setLoading(true)
        try {
            const result = await upsertSkill({ ...data, id: initialData?.id })
            if (result.error) toast.error(result.error)
            else {
                toast.success(initialData ? 'Skill updated' : 'Skill added')
                onOpenChange(false)
                router.refresh()
            }
        } catch (e) { toast.error('Something went wrong') }
        finally { setLoading(false) }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-panel border-border text-white sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>{initialData ? 'Edit Skill' : 'Add Skill'}</DialogTitle>
                    <DialogDescription>Add a technical skill.</DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Skill Name</label>
                        <Input {...form.register('name')} placeholder="e.g. React" />
                        {form.formState.errors.name && (
                            <p className="text-xs text-red-400">{form.formState.errors.name.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <Select
                            onValueChange={(val: string) => form.setValue('category', val as any)}
                            defaultValue={form.watch('category')}
                        >
                            <SelectTrigger className="bg-black border-white/10 text-white">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent className="bg-panel border-border text-white">
                                {SKILL_CATEGORIES.map((cat) => (
                                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {form.formState.errors.category && (
                            <p className="text-xs text-red-400">{form.formState.errors.category.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Proficiency Level</label>
                        <Select
                            onValueChange={(val: string) => form.setValue('proficiency_level', val as any)}
                            defaultValue={form.watch('proficiency_level')}
                        >
                            <SelectTrigger className="bg-black border-white/10 text-white">
                                <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent className="bg-panel border-border text-white">
                                {PROFICIENCY_LEVELS.map((level) => (
                                    <SelectItem key={level} value={level} className="capitalize">{level}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {form.formState.errors.proficiency_level && (
                            <p className="text-xs text-red-400">{form.formState.errors.proficiency_level.message}</p>
                        )}
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
