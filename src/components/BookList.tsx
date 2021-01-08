import React, {ReactElement} from 'react';

import {books} from '../shared/books'
import BookListItem from './BookListItem'
import Book from '../types/Book'

interface Props {
  showDetails: (book: Book) => void
}

export default function BookList(props: Props): ReactElement {
  return (
    <div className="ui middle aligned selection divided list">
      {books.map(book => <BookListItem showDetails={props.showDetails} book={book} key={book.isbn} />)}
    </div>
  )
}
