import React, {useState, useEffect, ReactElement} from 'react';
import axios, {AxiosResponse} from 'axios';

import BookListItem from './BookListItem'
import Book from '../types/Book'

interface Props {
  showDetails: (book: Book) => void
}

export default function BookList(props: Props): ReactElement {
  const [books, setBooks] = useState<Book[]>()

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://api3.angular-buch.com/books'
    })
      .then((response: AxiosResponse<Book[]>) => setBooks(response.data))
  }, [])

  if (!books) {return <p>Lade</p>}

  return (
    <div className="ui middle aligned selection divided list">
      {books.map(book => <BookListItem showDetails={props.showDetails} book={book} key={book.isbn} />)}
    </div>
  )
}
