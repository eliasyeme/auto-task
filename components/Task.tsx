'use client'
import { deleteTask, updateTask, updateTaskStatus } from '@/lib/actions'
import { Task } from '@prisma/client'
import { Checkbox } from './ui/checkbox'
import { Button } from './ui/button'
import { Pencil, Trash } from 'lucide-react'
import { useRef, useState } from 'react'
import { Input } from './ui/input'
import clsx from 'clsx'

const TaskItem = ({ task }: { task: Task }) => {
  const editingRef = useRef<HTMLInputElement>(null)
  const updateTaskWithId = updateTask.bind(null, task.id)

  return (
    <li className="flex items-center gap-2">
      <Checkbox
        className={task.status ? 'opacity-50' : ''}
        onClick={async () => await updateTaskStatus(task.id)}
        defaultChecked={task.status}
        id={`${task.id}`}
      />
      <form
        action={updateTaskWithId}
        className={clsx(
          'w-full flex-1',
          task.status && ' line-through opacity-50',
        )}
      >
        <Input
          ref={editingRef}
          name="content"
          defaultValue={task.content}
          className="w-full border-none p-0 text-base focus-visible:underline focus-visible:underline-offset-2 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </form>

      <div className="ml-auto flex items-center gap-2">
        {/* Edit */}
        <Button
          aria-label="Edit task"
          variant="outline"
          size="icon"
          onClick={() => editingRef.current?.focus()}
        >
          <Pencil className="h-4 w-4" />
        </Button>

        {/* Delete */}
        <Button
          aria-label="Delete task"
          onClick={async () => await deleteTask(task.id)}
          variant="outline"
          size="icon"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </li>
  )
}

export default TaskItem
