import TaskForm from '@/components/TaskForm'
import TaskList from '@/components/TaskList'

export default function Page({ params }: { params: { id: number } }) {
  return (
    <div className="flex max-w-4xl flex-col gap-y-6 p-6">
      <TaskForm id={params.id} />
      <TaskList id={params.id} />
    </div>
  )
}
