import React from 'react'
import Loader from 'react-loader-spinner'

function Loading () {
  return (
    <div
      style={
                { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }
            }
    >
      <Loader
        type='Rings'
        color='#73AAFC'
        height={100}
        width={100}
      />
    </div>
  )
}

export default Loading
