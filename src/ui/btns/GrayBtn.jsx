import React from 'react'
import gb from 'ui/scssModule/grayBtn.module.scss'
function GrayBtn ({ children, func }) {
  return (<button onClick={func} className={gb.btn}>{children}</button>)
}

export default GrayBtn
