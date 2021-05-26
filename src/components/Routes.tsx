import React, {ReactElement} from 'react';
import {Route, Switch} from 'react-router-dom';
import ClassCounter from './ClassCounter';
import FunctionalCounter from './FunctionalCounter';
import ProjectCreate from './ProjectCreate';
import ProjectDetails from './ProjectDetails';
import ProjectEdit from './ProjectEdit';
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
        <ProjectCreate />
      </Route>
      <Route path="/projects/:projectId/edit">
        <ProjectEdit />
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
