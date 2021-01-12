import React, {ReactElement, useReducer} from 'react';
import {Redirect, Switch, Route} from 'react-router-dom'

import BookList from './BookList'
import BookDetails from './BookDetails'
import Home from './Home'
import BookCreate from './BookCreate';
import BookEdit from './BookEdit';
import Cart from './Cart';
import {initialStore, reducer} from '../Store';

export default function Routes(): ReactElement {
  const [store, dispatch] = useReducer(reducer, initialStore)
  return (
    <Switch>
      <Route path='/books/new'>
        <BookCreate />
      </Route>

      <Route path='/books/:isbn/edit'>
        <BookEdit />
      </Route>

      <Route path='/books/:isbn'>
        <BookDetails dispatch={dispatch} />
      </Route>

      <Route path='/books'>
        <BookList />
      </Route>

      <Route path='/cart'>
        <Cart dispatch={dispatch} store={store} />
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
