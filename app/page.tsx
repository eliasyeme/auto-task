import TaskForm from '@/components/TaskForm'
import TaskList from '@/components/TaskList'

export default function Home() {
  return (
    <div>
      <h1>Main page</h1>
      <TaskForm />
      <TaskList />
    </div>
  )
}
