import ProjectList from '@/components/ProjectList'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import AddProjectDialog from '@/components/AddProjectDialog'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={20}>
        <div className="flex items-center p-6">
          <Link className="flex-1" href="/projects">
            Project List
          </Link>
          <AddProjectDialog />
        </div>
        <Separator />
        <div className="p-6">
          <ProjectList />
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={80}>{children}</ResizablePanel>
    </ResizablePanelGroup>
  )
}
