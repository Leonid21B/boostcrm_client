import { useState } from 'react'

export default function useInput (initialValue, callBack) {
  const [value, setvalue] = useState(initialValue)

  function onChange (e) {
    setvalue(e.target.value)
    callBack(e)
  }

  function resetInputValue (value) {
    setvalue(value)
  }
  return {
    value, onChange, resetInputValue
  }
}
