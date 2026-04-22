import Scaffold from '@/components/Scaffold'
import type { MikoProject } from '@/config'
import configValue from '@/values/config-value'

function _ProjectCard(project: MikoProject, id: number) {
  return (
    <div key={id} className="flex flex-col items-center">
      <a href={project.homepage}>
        <div className="text-2xl">{project.name}</div>
        <div className="text-lg">{project.description}</div>
        <div className="text-sm">{project.tags.join(' | ')}</div>
      </a>
    </div>
  )
}

export default function ProjectsPage() {
  const projects = configValue.projects
  return <Scaffold>{projects.map((p, idx) => _ProjectCard(p, idx))}</Scaffold>
}
