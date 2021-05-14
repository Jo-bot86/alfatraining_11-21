import React, {ReactElement} from "react"

import ProjectListItem from "./ProjectListItem"
import {projects} from './../shared/projects'
import Project from "../types/Project"

interface Props {
  onShowDetails: (project: Project) => void
}

function ProjectList(props: Props): ReactElement {
  return (
    <div className="ui three cards" style={{padding: 20}}>
      {projects.map((project) =>
        <ProjectListItem key={project.id} project={project} onShowDetails={props.onShowDetails} />
      )}
    </div>
  )
}

export default ProjectList
