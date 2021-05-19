import React, {ReactElement} from "react"
import {useParams} from "react-router"
import {Link} from "react-router-dom"

import {useProjectApi} from "../shared/ProjectApi"
import Project from "../types/Project"
import ProjectProgress from "./ProjectProgress"
import ProjectTimes from "./ProjectTimes"

function ProjectDetails(): ReactElement {
  const {projectId} = useParams<{projectId: string}>()
  const [project] = useProjectApi<Project>(`projects/${projectId}`)

  if (!project) {return <p>Lade</p>}

  return (
    <>
      <div>
        <h1>{project.title}</h1>
        <div className="ui divider" />
        <div className="ui grid">
          <div className="four wide column">
            <h4>
              <i className="file image outline middle aligned icon" />
              Image
            </h4>
            <img className="ui image" alt="" src={project.img} />
          </div>
          <div className="four wide column">
            <h4>
              <i className="clock outline middle aligned icon" />
              Times
            </h4>
            <ProjectTimes project={project} />
          </div>
          <div className="four wide column">
            <h4>
              <i className="flag outline middle aligned icon" />
              Progress
            </h4>
            <ProjectProgress project={project} />
          </div>
          <div className="four wide column">
            <h4>
              <i className="compass outline middle aligned icon" />
              Status
            </h4>
            <p>{project.status}</p>
          </div>
        </div>
      </div>
      <div className="ui divider" />
      <Link className="ui red button" to="/projects">Back</Link>
    </>
  )
}

export default ProjectDetails
