import React, {ReactElement, useState} from 'react';
import Project from '../types/Project';
import ProjectDetails from './ProjectDetails';
import ProjectList from './ProjectList';

export default function App(): ReactElement {
  const [project, setProject] = useState<Project>()

  const onShowDetails = (project_: Project) => {
    setProject(project_)
  }

  const onShowList = () => {
    setProject(undefined)
  }

  return (
    <div className="ui container">
      {project
        ? <ProjectDetails project={project} onShowList={onShowList} />
        : <ProjectList onShowDetails={onShowDetails} />}
    </div>
  );
}
