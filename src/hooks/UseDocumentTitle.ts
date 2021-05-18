import {useEffect} from "react"

export function useDocumentTitle(newDocTitle: string): void {
  useEffect(() => {
    const defaultTitle = document.title
    document.title = newDocTitle
    return () => {
      document.title = defaultTitle
    }
  }, [newDocTitle])
}

