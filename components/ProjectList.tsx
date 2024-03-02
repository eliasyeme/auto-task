import { getAllProjects } from '@/lib/actions'
import { Button } from './ui/button'
import NavLink from './NavLink'
import { MoreHorizontal } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import EditDialog from './EditDialog'
import DeleteDialog from './DeleteDialog'

export default async function ProjectList() {
  const projects = await getAllProjects()
  return (
    <div className="flex h-full w-full flex-col">
      {projects.length > 0 ? (
        <ul>
          {projects.map((project) => (
            <li key={project.id} className="flex items-center">
              <NavLink className="flex-1" href={`/projects/${project.id}`}>
                {project.title}
              </NavLink>

              <Popover>
                <PopoverTrigger asChild>
                  <Button aria-label="Edit task" variant="link" size="icon">
                    <MoreHorizontal />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="max-w-fit">
                  <div className="ml-auto flex items-center gap-2">
                    {/* Edit */}
                    <EditDialog project={project} />
                    {/* Delete */}
                    <DeleteDialog
                      project={project}
                      href={`/projects/${project.id}`}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </li>
          ))}
        </ul>
      ) : (
        <div className="my-auto self-center text-gray-400">Add project</div>
      )}
    </div>
  )
}
