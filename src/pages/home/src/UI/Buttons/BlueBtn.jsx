import React from 'react'
import bb from '../../Styles/StyleModul/BlueBtn.module.scss'
function BlueBtn ({ children }) {
  return (
    <div>
      <a href='#' className={bb.btn}>{children}</a>
    </div>
  )
}

export default BlueBtn
