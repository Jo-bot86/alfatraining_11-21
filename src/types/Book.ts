export interface Book extends BookWithoutDate {
  published: Date;
}

export interface BookWithDateString extends BookWithoutDate {
  published: string
}

interface BookWithoutDate {
  isbn: string;
  title: string;
  authors: string[];
  subtitle?: string;
  rating?: number;
  thumbnails?: Thumbnail[];
  description?: string;
}

export interface Thumbnail {
  url: string;
  title?: string;
}

export function isBookBase(book: BookWithDateString): book is BookWithDateString {
  return !!(typeof book === 'object' && book.isbn && book.title && book.authors && book.published)
}

export function factoryRawToBook(book: BookWithDateString): Book {
  return {...book, published: new Date(book.published)}
}
