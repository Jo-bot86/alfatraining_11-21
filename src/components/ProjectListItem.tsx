import React, {ReactElement} from "react"
import {useHistory} from "react-router-dom"
import Project from "../types/Project"
import ProjectProgress from "./ProjectProgress"
import ProjectTimes from "./ProjectTimes"

interface Props {
  project: Project
}

function ProjectListItem(props: Props): ReactElement {
  const history = useHistory()
  const project = props.project

  const goToProjectDetails = () => {
    history.push(`/projects/${project.id}`)
  }

  return (
    <div onClick={goToProjectDetails} className="card">
      <div className="item" style={{margin: 15}}>
        <h2 className="ui image header">
          <div className="content">
            {project.title}
          </div>
        </h2>
        <div className="content">
          <table className="ui very basic celled table">
            <tbody>
              <tr>
                <td>
                  <h4 className="ui header">
                    <i className="flag outline middle aligned icon" />
                  </h4>
                </td>
                <td>
                  <ProjectProgress project={project} />
                </td>
              </tr>
              <tr>
                <td>
                  <h4 className="ui header">
                    <i className="compass outline middle aligned icon" />
                  </h4>
                </td>
                <td>
                  {project.status}
                </td>
              </tr>
              <tr>
                <td>
                  <h4 className="ui header">
                    <i className="clock outline middle aligned icon" />
                  </h4>
                </td>
                <td>
                  <ProjectTimes project={project} />
                </td>
              </tr>
              <tr>
                <td>
                  <h4 className="ui header">
                    <i className="file image outline middle aligned icon" />
                  </h4>
                </td>
                <td>
                  <img className="ui image small" alt="" src={project.img} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ProjectListItem
