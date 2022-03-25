import React from 'react'

function Span ({ arr }) {
  return (
    <span>
      {
                arr.filter(item => item)
            }
    </span>
  )
}

export default Span
