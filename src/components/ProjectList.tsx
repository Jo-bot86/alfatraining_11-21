import React, {ReactElement} from "react"
import {useProjectApi} from "../shared/ProjectApi"
import Project from "../types/Project"
import ProjectListItem from "./ProjectListItem"


interface Props {
  onShowDetails: (project: Project) => void
}

function ProjectList(props: Props): ReactElement {
  const [projects] = useProjectApi<Project[]>('projects')

  if (!projects) {return <p>Lade</p>}

  return (
    <div className="ui three cards" style={{padding: 20}}>
      {projects.map((project) =>
        <ProjectListItem key={project.id} project={project} onShowDetails={props.onShowDetails} />
      )}
    </div>
  )
}

export default ProjectList
