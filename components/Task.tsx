'use client'
import { deleteTask, updateTask, updateTaskStatus } from '@/lib/actions'
import { Task } from '@prisma/client'
import { Checkbox } from './ui/checkbox'
import { Button } from './ui/button'
import { Pencil, Trash } from 'lucide-react'
import { useRef, useState } from 'react'
import { Input } from './ui/input'
import clsx from 'clsx'
import { Textarea } from './ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import EditTask from './EditTask'

const TaskItem = ({ task }: { task: Task }) => {
  const editingRef = useRef<HTMLInputElement>(null)
  // const editingRef = useRef<HTMLTextAreaElement>(null)
  const updateTaskWithId = updateTask.bind(null, task.id)

  return (
    <li className="flex items-start gap-4">
      <Checkbox
        className={clsx('mt-2', task.status && 'opacity-50')}
        onClick={async () => await updateTaskStatus(task.id)}
        defaultChecked={task.status}
        id={`${task.id}`}
      />
      <div className="h-fit w-full">{task.content}</div>
      {/* <form
        action={updateTaskWithId}
        className={clsx(
          'h-fit w-full flex-1',
          task.status && ' line-through opacity-50',
        )}> */}

      {/* <Input
          ref={editingRef}
          name="content"
          defaultValue={task.content}
          className="h-8 w-60 break-words border-none p-0 text-base focus-visible:underline focus-visible:underline-offset-2 focus-visible:ring-0 focus-visible:ring-offset-0"
        /> */}
      {/* <Textarea
          ref={editingRef}
          name="content"
          defaultValue={task.content}
          className="h-min max-w-[780px] resize-y overflow-auto border-none p-0 text-base focus-visible:underline focus-visible:underline-offset-2 focus-visible:ring-0 focus-visible:ring-offset-0"
        /> */}
      {/* </form> */}

      <div className="ml-auto flex items-center gap-2">
        {/* Edit */}
        <EditTask task={task} />
        {/* <Button
          aria-label="Edit task"
          variant="link"
          size="icon"
          onClick={() => editingRef.current?.focus()}
        >
          <Pencil className="h-4 w-4" />
        </Button> */}

        {/* Delete */}
        <Button
          aria-label="Delete task"
          onClick={async () => await deleteTask(task.id)}
          variant="link"
          size="icon"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </li>
  )
}

export default TaskItem
