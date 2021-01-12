import React, {ReactElement} from 'react'
import {useParams} from 'react-router-dom';

import BookForm from './BookForm'
import {Book} from '../types/Book';
import {useBookApi} from '../shared/BookApi';
import LoadingSpinner from './shared/LoadingSpinner'

export default function BookEdit(): ReactElement {
  const isbn = useParams<{isbn: string}>().isbn
  const [book] = useBookApi<Book>(`book/${isbn}`)

  if (!book) {return <LoadingSpinner />}

  const dateToInputString = (date: Date) => date.toISOString().slice(0, 10)

  return <BookForm
    title={book.title}
    subtitle={book.subtitle}
    isbn={book.isbn}
    description={book.description}
    authors={book.authors}
    thumbnails={book.thumbnails || [{title: '', url: ''}]}
    published={dateToInputString(book.published)}
    isEdit={true}
  />
}
