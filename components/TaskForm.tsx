'use client'
import { createTask } from '@/lib/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormEvent } from 'react'

export default function TaskForm() {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (event.target instanceof HTMLFormElement) {
      const formData = new FormData(event.target)
      await createTask(formData)
      event.target.reset()
    }
  }
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-y-2">
        <Input name="content" type="text" placeholder="Task" />
        <div className="flex gap-2">
          <Button variant="default" type="submit" className="w-full">
            Add
          </Button>
          <Button variant="outline" type="button" disabled className="w-full">
            Generate
          </Button>
        </div>
      </form>
    </div>
  )
}
