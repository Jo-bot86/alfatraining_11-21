import React, {ReactElement} from "react"
import {useProjectApi} from "../shared/ProjectApi"
import Project from "../types/Project"
import ProjectListItem from "./ProjectListItem"

function ProjectList(): ReactElement {
  const [projects] = useProjectApi<Project[]>('projects')

  if (!projects) {return <p>Lade</p>}

  return (
    <div className="ui three cards" style={{padding: 20}}>
      {projects.map((project) =>
        <ProjectListItem key={project.id} project={project} />
      )}
    </div>
  )
}

export default ProjectList
