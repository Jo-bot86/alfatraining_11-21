import React, {useState, SyntheticEvent} from 'react';
import {useHistory} from 'react-router-dom'
import css from './BookForm.module.css'

import {bookApi} from '../shared/BookApi'

export default function BookForm(): JSX.Element {
  const buildThumbnail = (title = '', url = '') => ({title, url})

  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [isbn, setIsbn] = useState(Math.floor(Math.random() * 8999999999 + 1111111111).toString())
  const [description, setDescription] = useState('')
  const [authors, setAuthors] = useState([''])
  const [thumbnails, setThumbnails] = useState([buildThumbnail('', 'https://ng-buch.de/public/monkey-thinking.svg')])
  const [published, setPublished] = useState('')

  const history = useHistory()

  const book = () => ({title, subtitle, isbn, description, authors, thumbnails, published})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    bookApi('post', 'books', () => history.push('/books'), book())
  }

  const onChangeAuthor = (value: string, index: number) => {
    setAuthors(currentAuthors => {
      const copyAuthors = [...currentAuthors]
      copyAuthors[index] = value
      return copyAuthors
    })
  }

  const onChangeThumbnail = (index: number, inputObj: {url: string} | {title: string}) => {
    setThumbnails(_thumbnails => {
      const copyThumbnails = [..._thumbnails]
      copyThumbnails[index] = {...copyThumbnails[index], ...inputObj}
      return copyThumbnails
    })
  }

  const onAddThumbnail = () => {
    setThumbnails(currentThumbnails => {
      return [...currentThumbnails, buildThumbnail()]
    })
  }

  const onRemoveThumbnail = (index: number) => {
    setThumbnails(currentThumbnails => currentThumbnails.filter((_, i) => i !== index))
  }

  const onAddAuthor = () => {
    setAuthors(currentAuthors => [...currentAuthors, ''])
  }

  const onRemoveAuthor = () => {
    setAuthors(currentAuthors => {
      if (currentAuthors.length > 1) {
        const newAuthors = [...currentAuthors]
        newAuthors.pop()
        return newAuthors
      } else {
        return currentAuthors
      }
    })
  }

  return (
    <form className={`ui form ${css.bookForm}`} onSubmit={handleSubmit}>
      <label>Buchtitel</label>
      <input placeholder="Titel" required value={title} onChange={(e) => {setTitle(e.target.value)}} />

      <label>Untertitel</label>
      <input placeholder="Subtitle" value={subtitle} onChange={(e) => {setSubtitle(e.target.value)}} />

      <label>Isbn</label>
      <input
        placeholder="Isbn"
        required
        pattern="\d{10}|\d{13}"
        title="Isbn Nummer kann 10 oder 13 Zeichen lang sein"
        value={isbn}
        onChange={(e) => {setIsbn(e.target.value)}} />

      <label>Erscheinungsdatum</label>
      <input type="date" required value={published} onChange={(e) => {setPublished(e.target.value)}} />

      <label>Authoren</label>
      <button className="ui mini button" type="button" onClick={onAddAuthor}>+</button>
      <button className="ui mini button" type="button" onClick={onRemoveAuthor}>-</button>
      <div className="fields">
        {authors.map((author, index) =>
          <div key={index} className="sixteen wide field">
            <input
              placeholder="Autor"
              required
              value={author}
              onChange={(e) => {onChangeAuthor(e.target.value, index)}} />
          </div>
        )}
      </div>

      <label>Beschreibung</label>
      <input placeholder="Description" value={description} onChange={(e) => {setDescription(e.target.value)}} />

      <label>Bilder</label>
      <button className="ui mini button" type="button" onClick={onAddThumbnail}>+</button>
      {thumbnails.map((thumbnail, index) =>
        <div key={index} className="field">
          <input placeholder="Url" required className="eight wide field" value={thumbnail.url}
            onChange={(e) => {onChangeThumbnail(index, {url: e.target.value})}} />
          <input placeholder="Titel" className="seven wide field" value={thumbnail.title}
            onChange={(e) => {onChangeThumbnail(index, {title: e.target.value})}} />
          <button className="ui mini button" type="button" onClick={() => onRemoveThumbnail(index)}>-</button>
        </div >
      )}
      <button className="ui button">Submit</button>
    </form >
  )
}
