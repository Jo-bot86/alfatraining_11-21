import React, {ReactElement, useState} from "react"

function FunctionalCounter(): ReactElement {
  const [counter, setCounter] = useState(0)

  const onIncrement = () => {
    setCounter(currentCounter => currentCounter + 1)
  }

  return (
    <div>
      <p>Counter: {counter}</p>
      <button onClick={onIncrement} className="ui button">+</button>
    </div>
  )
}

export default FunctionalCounter
