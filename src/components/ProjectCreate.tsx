import React, {ReactElement} from "react"
import ProjectForm from "./ProjectForm"

function ProjectCreate(): ReactElement {
  return (
    <ProjectForm
      title=""
      img=""
      status="in-progress"
      progress="1"
      times={[{title: '', begin: '', end: ''}]}
      isEdit={false}
    />
  )
}

export default ProjectCreate
