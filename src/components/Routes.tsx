import React, {ReactElement} from 'react';
import {Redirect, Switch, Route} from 'react-router-dom'

import BookList from './BookList'
import BookDetails from './BookDetails'
import Home from './Home'
import BookForm from './BookForm';

export default function Routes(): ReactElement {
  return (
    <Switch>
      <Route path='/books/new'>
        <BookForm />
      </Route>

      <Route path='/books/:isbn'>
        <BookDetails />
      </Route>

      <Route path='/books'>
        <BookList />
      </Route>

      <Route path='/home'>
        <Home />
      </Route>

      <Route exact path=''>
        <Redirect to="/home" />
      </Route>
    </Switch>
  )
}
