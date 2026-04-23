import { ColumnLayout } from '@/components/ColumnLayout'
import Scaffold from '@/components/Scaffold'
import type { MikoProject } from '@/config'
import { getI18n } from '@/i18n/i18n-context'
import configValue from '@/values/config-value'

function _ProjectCard(project: MikoProject, id: number) {
  return (
    <div
      key={id}
      className="group bg-surface-container-low hover:bg-surface-container-high rounded-xl p-4"
    >
      <a href={project.homepage}>
        <h3 className="text-on-surface group-hover:text-primary mb-2 text-2xl font-bold">
          {project.name}
        </h3>
        <div className="text-on-surface-variant mb-2 text-lg">
          {project.description}
        </div>
        <div className="text-tertiary text-sm">{project.tags.join(' | ')}</div>
      </a>
    </div>
  )
}

export default function ProjectsPage() {
  const tr = getI18n().projectsPage
  const projects = configValue.projects

  return (
    <Scaffold>
      <ColumnLayout className="gap-y-4">
        <h1 className="my-2 text-2xl font-bold md:text-4xl">{tr.title}</h1>
        {projects.map((p, idx) => _ProjectCard(p, idx))}
      </ColumnLayout>
    </Scaffold>
  )
}
