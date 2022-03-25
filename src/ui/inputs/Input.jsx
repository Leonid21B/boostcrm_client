import React from 'react'
import ip from 'ui/scssModule/input.module.scss'
function Input ({ type, plc, name, value, onChange, onclick, onblur, calssname }) {
  return (
    <input
      className={ip.inp}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onClick={onclick}
      onBlur={onblur}
      placeholder={plc}
      autoComplete='off'
    />
  )
}

export default Input
