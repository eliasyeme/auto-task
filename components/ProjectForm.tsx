'use client'
import { createProject } from '@/lib/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormEvent } from 'react'

export default function ProjectForm() {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (event.target instanceof HTMLFormElement) {
      const formData = new FormData(event.target)
      await createProject(formData)
      event.target.reset()
    }
  }
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-y-2">
        <Input name="title" type="text" placeholder="Task" />
        <Button variant="default" type="submit">
          Add
        </Button>
      </form>
    </div>
  )
}
