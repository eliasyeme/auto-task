import { Button } from './ui/button'
import { Pencil } from 'lucide-react'
import { updateProject } from '@/lib/actions'
import { Input } from '@/components/ui/input'
import {
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogHeader,
} from './ui/dialog'
import { Project } from '@prisma/client'
import { Label } from './ui/label'

export default function EditDialog({ project }: { project: Project }) {
  const updateProjectWithId = updateProject.bind(null, project.id)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          aria-label="Edit task"
          variant="outline"
          size="icon"
          // onClick={() => editingRef.current?.focus()}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Rename project</DialogHeader>
        <form action={updateProjectWithId}>
          <Label htmlFor="rename">Rename</Label>
          <Input id="rename" name="title" defaultValue={project.title} />
          <DialogClose asChild className="mt-4">
            <DialogFooter>
              <Button type="submit">Rename</Button>
            </DialogFooter>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  )
}
