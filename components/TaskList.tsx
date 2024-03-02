import TaskItem from './Task'
import { getAllTaskByProjectId, getAllTasks } from '@/lib/actions'

const TodoList = async ({ id }: { id: number }) => {
  const tasks = await getAllTaskByProjectId(id)
  return (
    <ul className="flex flex-col gap-y-2">
      {tasks?.map((task) => <TaskItem task={task} key={task.content} />)}
    </ul>
  )
}

export default TodoList
