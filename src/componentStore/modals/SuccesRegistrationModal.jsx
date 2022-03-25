import { close, closeGraySvg } from 'img'
import React from 'react'

function SuccesRegistrationModal ({ active, setActive, body }) {
  function closeModal () {
    setActive(false)
    body[0].style.overflow = 'auto'
  }

  return (
    <div className='modalWrapper' style={active ? { display: 'block' } : null}>
      <div className='modalSuccessRegitration'>
        <div className='modal w_434Up'>
          <div className='modalTopLine'>
            <h3 className='modalTopLine__title'>Вы успешно зарегистрированы</h3>
            <img onClick={closeModal} className='modalTopLine__close' src={closeGraySvg} alt='' />
          </div>
          <p className='modalText' style={{ marginBottom: '0' }}>Данные для доступа придут вам на почту</p>
        </div>
      </div>
    </div>
  )
}

export default SuccesRegistrationModal
