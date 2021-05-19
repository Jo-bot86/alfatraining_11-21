import React, {ReactElement} from 'react';
import {BrowserRouter, NavLink, Route, Switch} from 'react-router-dom';
import ClassCounter from './ClassCounter';
import FunctionalCounter from './FunctionalCounter';
import ProjectDetails from './ProjectDetails';
import ProjectList from './ProjectList';

export default function App(): ReactElement {
  return (
    <BrowserRouter>
      <div className="ui menu">
        <NavLink to="/class-counter" className="item">Class Counter</NavLink>
        <NavLink to="/functional-counter" className="item">Functional Counter</NavLink>
        <NavLink to="/projects" className="item">Projects</NavLink>
        <NavLink exact to="/" className="item">Home</NavLink>
      </div>
      <div className="ui container">
        <Switch>
          <Route path="/functional-counter">
            <FunctionalCounter />
          </Route>
          <Route path="/class-counter">
            <ClassCounter />
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
      </div>
    </BrowserRouter>
  );
}
