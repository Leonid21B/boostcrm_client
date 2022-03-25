import { useState } from 'react'

export default function useActive (initialValue) {
  const [value, setValue] = useState(initialValue)

  function setActive (bool) {
    return () => {
      setValue(bool)
    }
  }

  return [value, setActive]
}
