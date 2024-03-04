import TaskItem from './Task'
import { getAllTaskByProjectId, getAllTasks } from '@/lib/actions'
import { ScrollArea } from './ui/scroll-area'

const TodoList = async ({ id }: { id: string }) => {
  const tasks = await getAllTaskByProjectId(id)
  return (
    <ScrollArea className="h-full">
      <ul className="flex flex-col gap-y-2">
        {tasks?.map((task) => <TaskItem task={task} key={task.content} />)}
      </ul>
    </ScrollArea>
  )
}

export default TodoList
