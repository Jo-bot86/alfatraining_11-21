import React, {ReactElement} from 'react';
import {Link} from 'react-router-dom';

export default function Home(): ReactElement {
  return (
    <>
      <h4>Willkommen beim BookMonkey</h4>
      <Link className="ui red button" to="/books">
        Buchliste ansehen
      </Link>
    </>
  )
}
