import React, { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { getcurrentCart } from 'redux/asyncRedux/CreateCart'
import { _getCurrentCart } from 'redux/redusers/CartReduser'
import CartService from 'requests/service/CartService'
import ip from 'ui/scssModule/input.module.scss'
import AlertSize from './AlertSize/AlertSize'

function InputStatement ({ innerLogScroll }) {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const [alertSize,setAlertSize] = useState(false)
  const [statusUp, setStatus] = useState('non_active_status')

  const { currentCart } = useSelector(state => state.newCart)
  const { user } = useSelector(state => state.user)

  async function sendComment (e, type) {
    if (comment.length == 0) return

    if (e.keyCode == 13 || type == 2) {
      setComment('')
      await CartService.createCardComment(comment, currentCart._id, user.id)
      await getcurrentCart(dispatch, currentCart._id)
      innerLogScroll()
    }
  }

  async function uploadFile (e) {
    const file = e.target.files[0]
    if(15 <= file.size / 1024 / 1024){
      setAlertSize(true)
      return
    }
    setStatus('orange_status')
    const formdata = new FormData()
    formdata.append('file', file)
    const result = await CartService.uploadFile(formdata, currentCart._id, user.id).then(data => data.data)
    dispatch(_getCurrentCart(result))
    setStatus('green_status')
    setTimeout(() => {
      setStatus('non_active_status')
    },2500)
  }

  return (
    <div className="">
      <div className={statusUp}>{statusUp === 'orange_status' ? 'Идёт загрузка файла ...' : 'Файл успешно загружен'}</div>
      <div className='currentcart__content-message'>
        <input
          className={ip.inp}
          type='text'
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder='Введите комментарий'
          autoComplete='off'
          onKeyUp={e => sendComment(e, 1)}
          maxLength={500}
        />
        <div className='currentcart__content-btns'>
          <label>
            <img alt='' />
            <input
              type='file'
              onChange={uploadFile}
              accept='.doc,.docx,.jpg,.png,.txt,.xlsx,.pdf,.gif,.tar,.zip'
            />
          </label>

          <button
            onClick={e => sendComment(e, 2)}
            className='currentcart__content-send'
          />
        </div>
      </div>
      <AlertSize active = {alertSize} setActive = {setAlertSize}/>
    </div>
  )
}

export default InputStatement
