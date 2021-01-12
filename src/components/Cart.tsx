import React, {SyntheticEvent} from 'react';
import BookListItem from './BookListItem';

import {Action, Store} from '../Store'
import {Book} from '../types/Book';
import {Link} from 'react-router-dom';

interface Props {
  dispatch: React.Dispatch<Action>
  store: Store
}

export default function Cart(props: Props): JSX.Element {
  const books = props.store.cart.reduce((acc: Book[], book) => {
    acc.find(book_ => book_.isbn === book.isbn) || acc.push(book)
    return acc
  }, [])
    .sort((bookA, bookB) => Number(bookA.isbn) - Number(bookB.isbn))

  const countBook = (book: Book): number => {
    return props.store.cart.filter(_book => _book.isbn === book.isbn).length
  }

  const onChangeCount = (e: React.MouseEvent, action: Action): void => {
    e.preventDefault()
    props.dispatch(action)
  }

  return (
    <>
      <h2>Shopping Cart</h2>
      {books.length
        ? (
          <div className="ui middle aligned selection divided list">
            {books.map(book =>
              <BookListItem key={book.isbn} book={book}>
                <div className="right floated content">
                  <div className="ui buttons">
                    <label data-testid="count-target" className="ui button"><i className="shopping cart icon" />{countBook(book)}</label>
                    <button className="ui button green" onClick={(e) => onChangeCount(e, {type: 'addToCart', book})}>+</button>
                    <button className="ui button red" onClick={(e) => onChangeCount(e, {type: 'removeFromCart', book})}>-</button>
                  </div>
                </div>
              </BookListItem>
            )}
          </div>
        ) : (
          <div className="ui placeholder segment">
            <div className="ui icon header">
              <i className="shopping cart icon" />
              No Books found
            </div>
            <Link to="/books" className="ui primary button">Go Shopping!</Link>
          </div>
        )}
    </>
  )
}
