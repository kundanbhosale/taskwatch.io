import { useEffect, useRef } from 'react'

/**
 * React Hook to detect outside mouse clicks
 * @param isOpen If true then this hook doesn't execute
 * @param callback function which will be called if the mouse click is outside refrence html element.
 * @returns MutableRefObject
 */
const UseOutsideClick = (isOpen: boolean, callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const handleClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target || null)) {
        callback()
      }
    }

    document.addEventListener('click', handleClick, true)

    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [isOpen])

  return ref
}

export default UseOutsideClick
