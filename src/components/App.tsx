import React, {ReactElement, useState} from 'react';

import BookList from './BookList'
import BookDetails from './BookDetails'
import {Book} from '../types/Book'

export default function App(): ReactElement {
  const [book, setBook] = useState<Book>();

  const showList = () => {
    setBook(undefined)
  };

  const showDetails = (book_: Book) => {
    setBook(book_)
  };

  return (
    <div className="ui container">
      {book
        ? <BookDetails showList={showList} book={book} />
        : <BookList showDetails={showDetails} />}
    </div>
  )
}
