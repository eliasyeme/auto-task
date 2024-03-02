'use client'
import { Plus } from 'lucide-react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogFooter,
  DialogHeader,
} from './ui/dialog'
import ProjectForm from './ProjectForm'
import { FormEvent, useEffect, useState } from 'react'
import { createProject } from '@/lib/actions'
import { Input } from './ui/input'

export default function AddProjectDialog() {
  const [domLoaded, setDomLoaded] = useState(false)
  useEffect(() => {
    setDomLoaded(true)
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (event.target instanceof HTMLFormElement) {
      const formData = new FormData(event.target)
      await createProject(formData)
      event.target.reset()
    }
  }

  return (
    <>
      {domLoaded && (
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>Add project</DialogHeader>
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="flex flex-col gap-y-2"
            >
              <Input name="title" type="text" placeholder="Task" />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="default" type="submit">
                    Add
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
