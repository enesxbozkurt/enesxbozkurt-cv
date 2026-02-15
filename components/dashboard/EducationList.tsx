'use client'

import { useState } from 'react'
import { EducationModal } from '@/components/dashboard/EducationModal'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Trash2, GraduationCap } from 'lucide-react'
import { EducationFormValues } from '@/lib/validators/education'
import { formatDateRange } from '@/lib/utils'
import { deleteEducation } from '@/lib/actions/education'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface EducationListProps {
    initialData: any[]
}

export function EducationList({ initialData }: EducationListProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingItem, setEditingItem] = useState<(EducationFormValues & { id: string }) | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const router = useRouter()

    const handleAdd = () => {
        setEditingItem(null)
        setIsModalOpen(true)
    }

    const handleEdit = (item: any) => {
        setEditingItem({
            id: item.id,
            institution: item.institution,
            degree: item.degree,
            field: item.field || '',
            start_date: item.start_date,
            end_date: item.end_date || '',
            description: item.description || '',
            is_current: !item.end_date,
        })
        setIsModalOpen(true)
    }

    const handleDelete = async () => {
        if (!deletingId) return
        try {
            const result = await deleteEducation(deletingId)
            if (result.error) toast.error(result.error)
            else {
                toast.success('Deleted successfully')
                router.refresh()
            }
        } catch (error) { toast.error('Something went wrong') }
        finally { setDeletingId(null) }
    }

    return (
        <>
            <div className="flex justify-end mb-6 -mt-16">
                <Button onClick={handleAdd} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Education
                </Button>
            </div>

            {initialData.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 border border-dashed border-white/10 rounded-lg bg-white/5">
                    <p className="text-muted mb-4">No education added yet.</p>
                    <Button variant="outline" onClick={handleAdd}>Add education</Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {initialData.map((item) => (
                        <div
                            key={item.id}
                            className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-panel border border-border rounded-lg hover:border-primary/50 transition-colors"
                        >
                            <div className="flex gap-4">
                                <div className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-lg bg-white/5 items-center justify-center text-primary">
                                    <GraduationCap className="h-6 w-6" />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                                        <h3 className="text-lg font-semibold text-white">{item.institution}</h3>
                                        <span className="hidden md:inline text-muted">•</span>
                                        <span className="text-primary font-medium">{item.degree}</span>
                                    </div>
                                    <p className="text-sm text-muted">{item.field}</p>
                                    <p className="text-xs text-muted/60">{formatDateRange(item.start_date, item.end_date)}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mt-4 md:mt-0 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button size="icon" variant="ghost" onClick={() => handleEdit(item)}>
                                    <Pencil className="h-4 w-4 text-muted hover:text-white" />
                                </Button>
                                <Button size="icon" variant="ghost" onClick={() => setDeletingId(item.id)}>
                                    <Trash2 className="h-4 w-4 text-muted hover:text-red-400" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <EducationModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                initialData={editingItem}
                key={editingItem ? editingItem.id : 'new'}
            />

            <AlertDialog open={!!deletingId} onOpenChange={(open: boolean) => !open && setDeletingId(null)}>
                <AlertDialogContent className="bg-panel border-border text-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Education?</AlertDialogTitle>
                        <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="border-white/10 hover:bg-white/5">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
