import { Button } from './ui/button'
import { Pencil } from 'lucide-react'
import { updateProject, updateTask } from '@/lib/actions'
import { Input } from '@/components/ui/input'
import {
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogHeader,
} from './ui/dialog'
import { Project, Task } from '@prisma/client'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

export default function EditTask({ task }: { task: Task }) {
  const updateTaskWithId = updateTask.bind(null, task.id)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          aria-label="Edit task"
          variant="link"
          size="icon"
          // onClick={() => editingRef.current?.focus()}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Edit Task</DialogHeader>
        <form action={updateTaskWithId}>
          <Label htmlFor="rename">Edit</Label>
          <Textarea id="rename" name="content" defaultValue={task.content} />
          <DialogClose asChild className="mt-4">
            <DialogFooter>
              <Button type="submit">Done</Button>
            </DialogFooter>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  )
}
