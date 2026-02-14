'use client'

import { useState } from 'react'
import { ProjectModal } from '@/components/dashboard/ProjectModal'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Trash2, Globe, Github, Layers } from 'lucide-react'
import { ProjectFormValues } from '@/lib/validators/project'
import { deleteProject } from '@/lib/actions/project'
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
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

interface ProjectListProps {
    initialData: any[]
}

export function ProjectList({ initialData }: ProjectListProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingItem, setEditingItem] = useState<ProjectFormValues | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const router = useRouter()

    const handleAdd = () => {
        setEditingItem(null)
        setIsModalOpen(true)
    }

    const handleEdit = (item: any) => {
        setEditingItem({
            id: item.id,
            title: item.title,
            description: item.description,
            tech_stack: Array.isArray(item.tech_stack) ? item.tech_stack.join(', ') : item.tech_stack || '',
            live_url: item.url || '',
            repo_url: item.github_url || '',
            image_url: item.image_url || '',
        })
        setIsModalOpen(true)
    }

    const handleDelete = async () => {
        if (!deletingId) return

        try {
            const result = await deleteProject(deletingId)
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
                    Add Project
                </Button>
            </div>

            {initialData.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 border border-dashed border-white/10 rounded-lg bg-white/5">
                    <p className="text-muted mb-4">No projects added yet.</p>
                    <Button variant="outline" onClick={handleAdd}>Add your first project</Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {initialData.map((item) => (
                        <div
                            key={item.id}
                            className="group flex flex-col bg-panel border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors"
                        >
                            <div className="relative w-full h-40 bg-black/50">
                                {item.image_url ? (
                                    <Image
                                        src={item.image_url}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-muted/20">
                                        <Layers className="w-12 h-12" />
                                    </div>
                                )}
                                {/* Actions Overlay */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <Button size="sm" variant="secondary" onClick={() => handleEdit(item)}>
                                        <Pencil className="h-4 w-4 mr-2" /> Edit
                                    </Button>
                                    <Button size="sm" variant="destructive" onClick={() => setDeletingId(item.id)}>
                                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                                    </Button>
                                </div>
                            </div>

                            <div className="p-4 flex flex-col flex-1">
                                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">{item.title}</h3>
                                <p className="text-sm text-muted mb-4 line-clamp-2 flex-1">{item.description}</p>

                                <div className="flex flex-wrap gap-1 mb-4">
                                    {item.tech_stack?.slice(0, 3).map((tech: string, i: number) => (
                                        <Badge key={i} variant="outline" className="text-[10px] px-1.5 py-0 h-5 border-white/10 text-muted">
                                            {tech}
                                        </Badge>
                                    ))}
                                    {item.tech_stack?.length > 3 && (
                                        <span className="text-[10px] text-muted self-center">+{item.tech_stack.length - 3}</span>
                                    )}
                                </div>

                                <div className="flex items-center gap-3 text-xs text-muted mt-auto pt-3 border-t border-white/5">
                                    {item.url && <div className="flex items-center gap-1"><Globe className="w-3 h-3" /> Live</div>}
                                    {item.github_url && <div className="flex items-center gap-1"><Github className="w-3 h-3" /> Code</div>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <ProjectModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                initialData={editingItem}
                key={editingItem ? editingItem.id : 'new'}
            />

            <AlertDialog open={!!deletingId} onOpenChange={(open: boolean) => !open && setDeletingId(null)}>
                <AlertDialogContent className="bg-panel border-border text-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete this project.
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
