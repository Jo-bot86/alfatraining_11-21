import React, {ReactElement} from "react"
import Project from "../types/Project"

interface Props {
  project: Project
}

export default function ProjectTimes(props: Props): ReactElement {
  return (
    <div className="ui relaxed divided list metadata">
      {props.project.times.map(({begin, end, title}) =>
        <div key={begin.toString()} className="item">
          <div className="content">
            <span className="header">
              {title}
            </span>
            {new Date(begin).toLocaleTimeString()} - {new Date(end).toLocaleTimeString()}
          </div>
        </div>
      )}
    </div>
  )
}
