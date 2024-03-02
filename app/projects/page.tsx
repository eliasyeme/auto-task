import ProjectForm from '@/components/ProjectForm'
import ProjectList from '@/components/ProjectList'

export default function Page() {
  return (
    <div className="flex h-full flex-col p-6">
      <ProjectForm />
      <ProjectList />
    </div>
  )
}
