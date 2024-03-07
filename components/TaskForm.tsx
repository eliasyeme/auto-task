'use client'
import { createManyTask, createTask } from '@/lib/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormEvent, useRef } from 'react'
import { z } from 'zod'
import { generateTodoList } from '@/lib/ai'

export default function TaskForm({ id }: { id: string }) {
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (event.target instanceof HTMLFormElement) {
      const formData = new FormData(event.target)
      await createTask(id, formData)
      event.target.reset()
    }
  }
  async function handleClick() {
    const checkInput = z.string().min(2)
    const input = checkInput.safeParse(inputRef.current?.value)
    if (input.success) {
      const taskList = await generateTodoList(input.data)
      await createManyTask(id, taskList.data)
    } else {
      console.log(input.error.errors[0].message)
    }
  }
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-y-2">
        <Input ref={inputRef} name="content" type="text" placeholder="Task" />
        <div className="flex gap-2">
          <Button variant="default" type="submit" className="w-full">
            Add
          </Button>
          <Button
            onClick={handleClick}
            variant="outline"
            type="button"
            className="w-full"
          >
            Generate
          </Button>
        </div>
      </form>
    </div>
  )
}
