'use client'

import { useState } from 'react'
import { ExperienceModal } from '@/components/dashboard/ExperienceModal'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Trash2, Calendar, MapPin } from 'lucide-react'
import { ExperienceFormValues } from '@/lib/validators/experience'
import { formatDateRange } from '@/lib/utils'
import { deleteExperience } from '@/lib/actions/experience'
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

interface ExperienceListProps {
    initialData: any[]
}

export function ExperienceList({ initialData }: ExperienceListProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingItem, setEditingItem] = useState<(ExperienceFormValues & { id: string }) | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const router = useRouter()

    const handleAdd = () => {
        setEditingItem(null)
        setIsModalOpen(true)
    }

    const handleEdit = (item: any) => {
        setEditingItem({
            id: item.id,
            company: item.company,
            position: item.position,
            location: item.location || '',
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
            const result = await deleteExperience(deletingId)
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success('Deleted successfully')
                router.refresh()
            }
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setDeletingId(null)
        }
    }

    return (
        <>
            <div className="flex justify-end mb-6 -mt-16">
                <Button onClick={handleAdd} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Experience
                </Button>
            </div>

            {initialData.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 border border-dashed border-white/10 rounded-lg bg-white/5">
                    <p className="text-muted mb-4">No experiences added yet.</p>
                    <Button variant="outline" onClick={handleAdd}>Add your first experience</Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {initialData.map((item) => (
                        <div
                            key={item.id}
                            className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-panel border border-border rounded-lg hover:border-primary/50 transition-colors"
                        >
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-lg font-semibold text-white">{item.position}</h3>
                                    <span className="text-muted">at</span>
                                    <span className="text-primary font-medium">{item.company}</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-3.5 w-3.5" />
                                        {formatDateRange(item.start_date, item.end_date)}
                                    </div>
                                    {item.location && (
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-3.5 w-3.5" />
                                            {item.location}
                                        </div>
                                    )}
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

            <ExperienceModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                initialData={editingItem}
                key={editingItem ? editingItem.id : 'new'} // Force re-mount on change
            />

            <AlertDialog open={!!deletingId} onOpenChange={(open: boolean) => !open && setDeletingId(null)}>
                <AlertDialogContent className="bg-panel border-border text-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this experience entry.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="border-white/10 hover:bg-white/5 hover:text-white">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
