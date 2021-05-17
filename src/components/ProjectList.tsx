import React, {ReactElement, useEffect, useState} from "react"
import axios, {AxiosResponse} from 'axios'

import ProjectListItem from "./ProjectListItem"
import Project from "../types/Project"

interface Props {
  onShowDetails: (project: Project) => void
}

function ProjectList(props: Props): ReactElement {
  const [projects, setProjects] = useState<Project[]>()

  useEffect(() => {
    axios({method: 'get', url: '/api/projects'})
      .then((response: AxiosResponse<Project[]>) => {
        setProjects(response.data)
      })
  }, [])

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
