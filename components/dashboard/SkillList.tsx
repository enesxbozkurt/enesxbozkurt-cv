'use client'

import { useState } from 'react'
import { SkillModal } from '@/components/dashboard/SkillModal'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { SkillFormValues, SKILL_CATEGORIES } from '@/lib/validators/skill'
import { deleteSkill } from '@/lib/actions/skill'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
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

interface SkillListProps {
    initialData: any[]
}

export function SkillList({ initialData }: SkillListProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingItem, setEditingItem] = useState<SkillFormValues | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<string>('Frontend')
    const router = useRouter()

    const handleAdd = (category?: string) => {
        setEditingItem(null)
        if (category) setSelectedCategory(category)
        setIsModalOpen(true)
    }

    const handleEdit = (item: any) => {
        setEditingItem({
            id: item.id,
            name: item.name,
            category: item.category as any,
            proficiency_level: item.proficiency_level,
        })
        setIsModalOpen(true)
    }

    const handleDelete = async () => {
        if (!deletingId) return
        try {
            const result = await deleteSkill(deletingId)
            if (result.error) toast.error(result.error)
            else {
                toast.success('Deleted successfully')
                router.refresh()
            }
        } catch (e) { toast.error('Something went wrong') }
        finally { setDeletingId(null) }
    }

    // Group skills by category
    const groupedSkills = SKILL_CATEGORIES.reduce((acc, cat) => {
        acc[cat] = initialData.filter(s => s.category === cat)
        return acc
    }, {} as Record<string, any[]>)

    return (
        <div className="space-y-4">
            <div className="flex justify-end mb-6 -mt-16">
                <Button onClick={() => handleAdd()} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Skill
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {SKILL_CATEGORIES.map((category) => (
                    <div key={category} className="bg-panel border border-border rounded-lg overflow-hidden flex flex-col">
                        <div className="p-4 border-b border-border bg-white/5 flex items-center justify-between">
                            <h3 className="font-semibold text-white">{category}</h3>
                            <Button size="sm" variant="ghost" onClick={() => handleAdd(category)} className="h-8 w-8 p-0 text-muted hover:text-white">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="p-4 flex-1">
                            {groupedSkills[category].length === 0 ? (
                                <p className="text-sm text-muted/50 text-center py-4 italic">No skills added</p>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {groupedSkills[category].map((skill) => (
                                        <Badge
                                            key={skill.id}
                                            variant="outline"
                                            className="px-3 py-1.5 hover:border-primary/50 transition-colors group relative pr-8 cursor-pointer"
                                            onClick={() => handleEdit(skill)}
                                        >
                                            {skill.name}
                                            <button
                                                className="absolute right-1 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    setDeletingId(skill.id)
                                                }}
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <SkillModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                initialData={editingItem}
                defaultCategory={selectedCategory}
                key={editingItem ? editingItem.id : `new-${selectedCategory}`}
            />

            <AlertDialog open={!!deletingId} onOpenChange={(open: boolean) => !open && setDeletingId(null)}>
                <AlertDialogContent className="bg-panel border-border text-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Skill?</AlertDialogTitle>
                        <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="border-white/10 hover:bg-white/5 text-muted hover:text-white">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
