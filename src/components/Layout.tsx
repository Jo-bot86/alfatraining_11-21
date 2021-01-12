import React, {ReactElement} from 'react';
import {NavLink} from "react-router-dom";

interface Props {children: ReactElement}

export default function Layout(props: Props): ReactElement {
  return (
    <>
      <div className="ui menu">
        <NavLink to="/home" className="item">Home</NavLink>
        <NavLink to="/books" className="item">Books</NavLink>
      </div>

      <div className="ui container">
        {props.children}
      </div>
    </>
  )
}