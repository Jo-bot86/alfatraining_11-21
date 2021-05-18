import React, {ReactElement, useState} from 'react';
import Project from '../types/Project';
import ClassCounter from './ClassCounter';
import FunctionalCounter from './FunctionalCounter';
import ProjectDetails from './ProjectDetails';
import ProjectList from './ProjectList';

export default function App(): ReactElement {
  const [project, setProject] = useState<Project>()
  const [showCounter, setShowCounter] = useState(true)

  const onShowDetails = (project_: Project) => {
    setProject(project_)
  }

  const onShowList = () => {
    setProject(undefined)
  }

  return (
    <div className="ui container">
      {showCounter && (
        <>
          <FunctionalCounter />
          <ClassCounter />
        </>
      )}
      {project
        ? <ProjectDetails projectId={project.id} onShowList={onShowList} />
        : <ProjectList onShowDetails={onShowDetails} />}
    </div>
  );
}
