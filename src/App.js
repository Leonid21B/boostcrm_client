import React from 'react'
import { withRouter } from 'react-router-dom'
import StoreStates from 'StoreStates'

function App () {
  return (
    <div className='App'>
      <div className='wrapper'>
        <StoreStates />
      </div>
    </div>
  )
}

export default withRouter(App)
