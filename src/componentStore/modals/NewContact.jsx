import React, { useState } from 'react'
import { closeGraySvg } from 'img'
import BlueBtn from 'ui/btns/BlueBtn'
import GrayBtn from 'ui/btns/GrayBtn'
import { createNewField } from 'redux/asyncRedux/NewFieldAsync'
import { useDispatch, useSelector } from 'react-redux'

import 'scss/commonStyleOfModal.scss'
import { getcurrentCart } from 'redux/asyncRedux/CreateCart'

function NewContact ({ active, setActive, id, logRef }) {
  const dispatch = useDispatch()

  const [firstField, setFirstField] = useState('')
  const [secondField, setSecondField] = useState('')
  const { user } = useSelector(state => state.user)

  const [inputsError, setInputsError] = useState({
    ffe: false,
    sfe: false
  })

  async function createField () {
    if (firstField.length == 0 && secondField.length == 0) {
      setInputsError({ ...inputsError, ffe: true, sfe: true })
      return
    }
    if (firstField.length == 0) {
      setInputsError({ ...inputsError, ffe: true })
      return
    }
    if (secondField.length == 0) {
      setInputsError({ ...inputsError, sfe: true })
      return
    }
    closeModal()
    await createNewField(dispatch, firstField, secondField, id, user.id)
    logRef.current.scrollTop = logRef.current.scrollHeight
    document.getElementsByTagName('body')[0].style.overflowY = 'scroll'
  }

  function closeModal () {
    setActive(false)
    setFirstField('')
    setSecondField('')
    document.getElementsByTagName('body')[0].style.overflowY = 'scroll'
  }

  return (
    <div className='modalWrapper' style={active ? { display: 'block' } : null}>
      <div className='modalParandja'>
        <div className='modal w_500Up'>
          <div className='modalTopLine mb_24'>
            <h3 className='modalTopLine__title'>Новый контакт</h3>
            <button onClick={closeModal} className='newcontact__modal-close'>
              <img className='modalTopLine__close' src={closeGraySvg} alt='' />
            </button>
          </div>
          <form onSubmit={e => e.preventDefault()}>

            <div className='newcontact__modal-inputs'>
              <label className='modal__Label' htmlFor='newplace'>Тип контакта</label>
              <input
                className='modal__Input'
                type='text'
                name='title'
                value={firstField}
                onChange={e => setFirstField(e.target.value)}
                maxLength={20}
                autoComplete='off'
              />

              <label className='modal__Label' htmlFor='newvalue'>Данные</label>
              <input
                className='modal__Input'
                type='text'
                name='value'
                value={secondField}
                onChange={e => setSecondField(e.target.value)}
                maxLength={40}
                autoComplete='off'
              />
            </div>
            <div className='modal__Btns'>
              <GrayBtn func={closeModal}>Отменить</GrayBtn>
              <BlueBtn func={createField}>Сохранить</BlueBtn>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default NewContact
