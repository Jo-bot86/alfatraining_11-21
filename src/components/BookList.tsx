import React, {useState, useEffect, ReactElement} from 'react';
import axios, {AxiosResponse} from 'axios';

import BookListItem from './BookListItem'
import Book from '../types/Book'
import LoadingSpinner from './shared/LoadingSpinner';

interface Props {
  showDetails: (book: Book) => void
}

export default function BookList(props: Props): ReactElement {
  const [books, setBooks] = useState<Book[]>()

  const getBooks = () => {
    axios({
      method: 'get',
      url: 'https://api3.angular-buch.com/books'
    })
      .then((response: AxiosResponse<Book[]>) => setBooks(response.data))
  }

  useEffect(getBooks, [])

  if (!books) {return <LoadingSpinner name="Bücher" />}

  const onReset = () => {
    axios({
      method: 'delete',
      url: 'https://api3.angular-buch.com/books'
    }).then(getBooks)
  }

  return books.length // !== 0
    ? (
      <div className="ui middle aligned selection divided list">
        {books.map(book => <BookListItem showDetails={props.showDetails} book={book} key={book.isbn} />)}
      </div>
    )
    : (
      <div className="ui message">
        <div className="header">
          Keine Bücher vorhanden!
          {' '}
          <button className="ui button" onClick={onReset}>Zurücksetzen</button>
        </div>
      </div>
    )
}
