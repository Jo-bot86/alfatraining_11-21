import {useEffect} from "react"

export function useInterval(intervalFunc: () => void): void {
  useEffect(() => {
    console.log('effect function');
    const intervalId = window.setInterval(intervalFunc, 1000)
    return () => {
      console.log('cleaner function');
      window.clearInterval(intervalId)
    }
  }, [intervalFunc])
}

