import {useCallback, useState} from 'react'

export function useCounter(): [number, () => void] {
  const [counter, setCounter] = useState(0)

  const onIncrement = useCallback(() => {
    setCounter(currentCounter => currentCounter + 1)
  }, [])

  return [counter, onIncrement]
}

