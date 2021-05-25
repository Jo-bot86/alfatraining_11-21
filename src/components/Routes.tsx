import React, {ReactElement, useReducer} from 'react';
import {Route, Switch} from 'react-router-dom';
import {initialStore, reducer} from '../Store';
import ClassCounter from './ClassCounter';
import FunctionalCounter from './FunctionalCounter';
import ProjectCreate from './ProjectCreate';
import ProjectDetails from './ProjectDetails';
import ProjectEdit from './ProjectEdit';
import ProjectList from './ProjectList';

function Routes(): ReactElement {
  const [store, dispatch] = useReducer(reducer, initialStore)
  console.log('store', store, 'dispatch', dispatch);
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
        <ProjectDetails store={store} dispatch={dispatch} />
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
