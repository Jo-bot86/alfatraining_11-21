import React, {ReactElement} from 'react';

import BookList from './BookList'

export default function App(): ReactElement {
  return (
    <div className="ui container">
      <BookList />
    </div>
  );
}
