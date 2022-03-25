import React from 'react'
import hb from '../../Styles/StyleModul/HeaderBtn.module.scss'
function HeaderBtn ({ func }) {
  return (
    <div>
      <a onClick={func} className={hb.hb}>Попробовать бесплатно</a>
    </div>
  )
}

export default HeaderBtn
