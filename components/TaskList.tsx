import TaskItem from './Task'
import { getAllTasks } from '@/lib/actions'

const TodoList = async () => {
  const tasks = await getAllTasks()
  return (
    <ul>{tasks?.map((task) => <TaskItem task={task} key={task.content} />)}</ul>
  )
}

export default TodoList
