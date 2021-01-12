import React, {ReactElement} from 'react';

export default function App(): ReactElement {
  return (
    <div className="ui active inverted dimmer">
      <div className="ui text loader large">Lade BookShelf ...</div>
    </div>
  );
}
