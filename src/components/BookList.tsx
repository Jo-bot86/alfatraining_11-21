import React, {ReactElement} from 'react';

import {books} from '../shared/books'
import BookListItem from './BookListItem'

export default function BookList(): ReactElement {
  return (
    <div className="ui middle aligned selection divided list">
      {books.map(book => <BookListItem key={book.isbn} book={book} />)}
    </div>
  )
}
