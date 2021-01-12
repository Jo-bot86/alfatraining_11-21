import React, {Fragment, ReactElement} from 'react';

import {Book} from '../types/Book'
import LoadingSpinner from './shared/LoadingSpinner'
import {useBookApi, bookApi} from '../shared/BookApi'
import {Link, useHistory, useParams} from 'react-router-dom';

export default function BookDetails(): ReactElement {
  const {isbn} = useParams<{isbn: string}>()
  const history = useHistory()
  const book = useBookApi<Book>(`books/${isbn}`)[0]

  if (!book) {return <LoadingSpinner name={`Buch ${isbn}`} />}

  const onGoToList = () => {
    history.push('/books')
  }

  const onDelete = () => {
    bookApi('delete', `books/${isbn}`, onGoToList)
  }

  const getRatings = () => Array.from(Array(book.rating || 0).keys())

  return (
    <>
      <div>
        <h1>{book.title}</h1>
        <div className="ui divider"></div>
        <div className="ui grid">
          <div className="four wide column">
            <h4>Autoren</h4>
            {/* alternativ: `book.authors.join(', ')` */}
            {book.authors.map((author, index) =>
              <Fragment key={author}>
                {author}
                {index !== book.authors.length - 1 && ', '}
              </Fragment>
            )}
          </div>
          <div className="four wide column">
            <h4>ISBN</h4>
            ISBN {book.isbn}
          </div>
          <div className="four wide column">
            <h4>Erschienen</h4>
            <p>{book.published.toLocaleDateString()}</p>
          </div>
          <div className="four wide column">
            <h4>Rating</h4>
            {getRatings().map(key => {
              return <i key={key} className="yellow star icon"></i>
            })}
          </div>
        </div>
        <h4>Beschreibung</h4>
        <p>{book.description}</p>
        <div className="ui small images">
          {book.thumbnails && book.thumbnails.map(thumbnail =>
            <img key={thumbnail.title} alt={thumbnail.title} src={thumbnail.url} />
          )}
        </div>
      </div>
      <button onClick={onGoToList} className="ui button">Back</button>
      <button onClick={onDelete} className="ui red button">Delete</button>
      <Link to={`/books/${book.isbn}/edit`} className="ui yellow button">Edit</Link>
    </>
  )
}
