import React from 'react'
import { useHistory } from 'react-router-dom'
import tl from './moduleScss/topline.module.scss'
function TopLine ({ title, children }) {
  const history = useHistory()
  return (
    <div className={tl.firstline}>
      <span>{title}</span>
      <div className={tl.firstinfo}>
        {
                    children
                }
      </div>
    </div>
  )
}

export default TopLine
