'use client'
import { Button } from './ui/button'
import { Trash } from 'lucide-react'
import { Project } from '@prisma/client'
import { FormEvent } from 'react'
import { usePathname } from 'next/navigation'
import { deleteProject, deleteProjectAndRevalidate } from '@/lib/actions'
import { useRouter } from 'next/navigation'
import {
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogHeader,
  DialogDescription,
} from './ui/dialog'

export default function DeleteDialog({
  project,
  href,
}: {
  project: Project
  href: string
}) {
  const path = usePathname()
  const route = useRouter()
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (href === path) {
      await deleteProject(project.id)
      route.replace('/projects')
    } else {
      await deleteProjectAndRevalidate(project.id, path)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button aria-label="Delete task" variant="outline" size="icon">
          <Trash className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Delete project</DialogHeader>
        <DialogDescription>
          Are you sure you want to delete{' '}
          <span className="underline">{project.title}</span>?
        </DialogDescription>
        <form onSubmit={handleSubmit}>
          <DialogClose asChild className="mt-4">
            <DialogFooter>
              <Button type="submit">Delete</Button>
            </DialogFooter>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  )
}
