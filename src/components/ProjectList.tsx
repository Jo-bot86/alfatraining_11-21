import React, {ReactElement} from "react"

import ProjectListItem from "./ProjectListItem"
import {projects} from './../shared/projects'

function ProjectList(): ReactElement {
  return (
    <div className="ui three cards" style={{padding: 20}}>
      {projects.map((project) =>
        <ProjectListItem key={project.id} project={project} />
      )}
    </div>
  )
}

export default ProjectList
