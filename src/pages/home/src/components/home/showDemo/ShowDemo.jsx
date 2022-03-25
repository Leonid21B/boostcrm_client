import React from 'react'
import '../../../Styles/showdemo.scss'

function ShowDemo () {
  return (
    <div className='showdemo'>
      <div className='homepage__container'>
        <div className='showdemo__inner'>
          <div className='showdemo__demo' />
          <a href='/#' className='showdemo__demo-btn'>Смотреть демо</a>
        </div>
      </div>
    </div>
  )
}

export default ShowDemo
