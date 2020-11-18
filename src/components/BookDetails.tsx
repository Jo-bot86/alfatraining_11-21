import React, {Fragment, ReactElement, useEffect, useState} from 'react';
import axios, {AxiosResponse} from 'axios';

import Book from '../types/Book'
import LoadingSpinner from './shared/LoadingSpinner'

interface Props {
  book: Book
  showList: () => void
}

export default function BookDetails(props: Props): ReactElement {
  const [book, setBook] = useState<Book>()

  useEffect(() => {
    axios({
      method: 'get',
      url: `https://api3.angular-buch.com/books/${props.book.isbn}`
    })
      .then((response: AxiosResponse<Book>) => setBook(response.data))
  }, [props.book.isbn])

  if (!book) {return <LoadingSpinner name={`Buch ${props.book.isbn}`} />}

  const onDelete = () => {
    axios({
      method: 'delete',
      url: `https://api3.angular-buch.com/books/${props.book.isbn}`
    })
      .then(props.showList)
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
            <p>{new Date(book.published).toLocaleDateString()}</p>
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
      <button onClick={props.showList} className="ui button">Back</button>
      <button onClick={onDelete} className="ui red button">Delete</button>
    </>
  )
}
