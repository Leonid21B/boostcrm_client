import React from 'react'
import bb from 'ui/scssModule/blueBtn.module.scss'
function BlueBtn ({ children, func, disabled }) {
  return (<button style={disabled ? { pointerEvents: 'none' } : { pointerEvents: 'auto' }} onClick={func} className={bb.btn}>{children}</button>)
}

export default BlueBtn
