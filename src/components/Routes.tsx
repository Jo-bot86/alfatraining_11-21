import React, {ReactElement} from 'react';
import {Route, Switch} from 'react-router-dom';
import ClassCounter from './ClassCounter';
import FunctionalCounter from './FunctionalCounter';
import ProjectDetails from './ProjectDetails';
import ProjectForm from './ProjectForm';
import ProjectList from './ProjectList';

function Routes(): ReactElement {
  return (
    <Switch>
      <Route path="/functional-counter">
        <FunctionalCounter />
      </Route>
      <Route path="/class-counter">
        <ClassCounter />
      </Route>
      <Route path="/projects/new">
        <ProjectForm />
      </Route>
      <Route path="/projects/:projectId">
        <ProjectDetails />
      </Route>
      <Route path="/projects">
        <ProjectList />
      </Route>
      <Route exact path="/">
        <p>Home</p>
      </Route>
    </Switch>
  )
}

export default Routes
