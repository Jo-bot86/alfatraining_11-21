import React, {ReactElement} from "react"
import {useCounter} from "../hooks/UseCounter"
import {useDocumentTitle} from "../hooks/UseDocumentTitle"
import {useInterval} from "../hooks/UseInterval"


function FunctionalCounter(): ReactElement {
  const [counter, onIncrement] = useCounter()
  useInterval(onIncrement)
  useDocumentTitle(`Counter: ${counter}`)

  return (
    <div>
      <p>Counter: {counter}</p>
      <button onClick={onIncrement} className="ui button">+</button>
    </div>
  )
}

export default FunctionalCounter
