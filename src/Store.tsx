import {Book} from './types/Book';

export interface Store {
  cart: Book[]
}

export const initialStore: Store = {cart: []}

interface AddToCart {
  type: "addToCart"
  book: Book
}

interface RemoveFromCart {
  type: "removeFromCart"
  book: Book
}

export type Action = AddToCart | RemoveFromCart

export const reducer = (store: Store, action: Action): Store => {
  switch (action.type) {
  case "addToCart":
    return {
      ...store,
      cart: [...store.cart, action.book]
    };
  case "removeFromCart": {
    const index = store.cart.map(book => book.isbn).indexOf(action.book.isbn)
    return {...store, cart: store.cart.filter((_book, i) => i !== index)}
  }
  }
};
