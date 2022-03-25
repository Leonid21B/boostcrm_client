import { closeGraySvg } from 'img'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { inviteWorker } from 'redux/asyncRedux/WorkerAsync'
import BlueBtn from 'ui/btns/BlueBtn'
import GrayBtn from 'ui/btns/GrayBtn'

import 'scss/commonStyleOfModal.scss'
import { _getInvitedWorker, _inviteWorker } from 'redux/redusers/WorkerReduser'

function InviteWorker ({ active, setActive }) {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)
  const { workers } = useSelector(state => state.worker)
  const { comand } = useSelector(state => state.comand)
  const [email, setEmail] = useState('')

  const [inputError, setInputError] = useState(false)

  function closeModal () {
    setActive(false)
    setInputError(false)
    setEmail('')
  }

  async function invite () {
    if (email.length > 0) {
      const data = await inviteWorker(dispatch, email, user.id)
      if (data.status != 404) {
        dispatch(_inviteWorker(data.user))
        setInputError(false)
        closeModal()
        return
      }
      setInputError(true)
      return
    }
    setInputError(true)
  }
  return (
    <div className='modalWrapper' style={active ? { display: 'block' } : null}>
      <div className='modalParandja'>
        <div className='modal w_400Up'>
          <div className='modalTopLine'>
            <h1 className='modalTopLine__title'>Пригласить сотрудника</h1>
            <img className='modalTopLine__close' onClick={closeModal} src={closeGraySvg} alt='' />
          </div>
          <p className='modalText'>Укажите электронную почту сотрудника. Мы отправим ему (ей) письмо с инструкцией по созданию бесплатной учетной записи.</p>

          <label className='modal__Label' htmlFor=''>E-mail</label>
          <input
            className={`modal__Input ${inputError ? 'inputError' : null}`}
            type='text'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <p style={inputError
            ? {
                display: 'block',
                marginBottom: '8px',
                color: '#FF4D4D',
                fontSize: '13px',
                lineHeight: '16px'
              }
            : { display: 'none' }}
          >Такой пользователь уже есть
          </p>
          <div className='modal__Btns'>
            <GrayBtn func={closeModal}>Отменить</GrayBtn>
            <BlueBtn func={invite}>Отправить приглашение</BlueBtn>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InviteWorker
