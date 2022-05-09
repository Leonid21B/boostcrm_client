import { close, closeGraySvg } from 'img'
import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { sendUserStatement } from 'redux/asyncRedux/UserAuthAsync'
import { ContentStatesStore } from 'StoreStates'
import BlueBtn from 'ui/btns/BlueBtn'
import GrayBtn from 'ui/btns/GrayBtn'

function HelpModal () {
  const [checked, setChecked] = useState(false)

  const { openHelpModal, setOpenHelpModal } = useContext(ContentStatesStore)
  const { user } = useSelector(state => state.user)

  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')
  const [type, setType] = useState(2)

  function closeModal () {
    setOpenHelpModal(false)
    setTitle('')
    setComment('')
  }

  async function sendStatement () {
    if (title.length != 0 && comment.length > 0) {
      sendUserStatement(title, comment, type, user.id)
      closeModal()
    }
  }

  return (
    <div className='modalWrapper' style={openHelpModal ? { display: 'block' } : null}>
      <div className='modalParandja'>
        <div className='modal w_400Up'>
          <div className='modalTopLine '>
            <h1 className='modalTopLine__title'>Связаться с нами</h1>
            <img onClick={closeModal} className='modalTopLine__close' src={closeGraySvg} alt='' />
          </div>
          <p className='modalText'>Задайте вопрос и менеджер ответит </p>
          <label className='modal__Label'>Тема</label>
          <input value={title} onChange={e => setTitle(e.target.value)} className='modal__Input' type='text' />

          <label className='modal__Label'>Комментарий</label>
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            className='modal__TextArea h_100Up'
            maxLength={500}
          />

          <div className='modal__checkboxes'>
            <label onClick={() => setType(1)}>
              <input checked={checked} onChange={() => setChecked(true)} type='checkbox' name='' id='' />
              <div className='modal__checkboxes-checkbox' />
              Перезвоните мне
            </label>

            <label onClick={() => setType(2)}>
              <input checked={!checked} onChange={() => setChecked(false)} type='checkbox' name='' id='' />
              <div className='modal__checkboxes-checkbox' />
              Пришлите ответ на почту
            </label>
          </div>
          <div className='modal__Btns'>
            <GrayBtn func={closeModal}>Отменить</GrayBtn>
            <BlueBtn func={sendStatement}>Отправить</BlueBtn>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpModal
