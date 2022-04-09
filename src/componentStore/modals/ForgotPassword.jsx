import { closeGraySvg, eye } from 'img'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { updateUserPassword } from 'redux/asyncRedux/UserAuthAsync'
import { _getUserInfo } from 'redux/redusers/UserReduser'
import BlueBtn from 'ui/btns/BlueBtn'
import GrayBtn from 'ui/btns/GrayBtn'
import fpm from '../moduleScss/forgotPassword.module.scss'

function ForgotPassword({ active, setActive }) {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [repeatNewPassword, setRepeatNewPassword] = useState('')

  const [showPassForNewPass, setShowPassForNewPass] = useState(false)
  const [showPassForRepeatNewPass, setShowPassForRepeatNewPass] = useState(false)

  const [isValid, setIsValid] = useState(false)

  const [inputsError, setInputsError] = useState({
    oldPassError: false,
    newPassError: false,
    repNewPass: false
  })

  const [oldPassText, setOldPassText] = useState('Введите пароль')
  const [newAndRepeatPassText, setNewAndRepeatPassText] = useState('Заполните поле')

  function resetAllFieldsAndStates() {
    setOldPassword('')
    setNewPassword('')
    setRepeatNewPassword('')

    setActive(false)

    setInputsError({ ...inputsError, oldPassError: false, newPassError: false, repNewPass: false })

    setNewAndRepeatPassText('Заполните поле')
    setOldPassText('Введите пароль')
  }

  async function updatePassword() {
    if (oldPassword.length == 0 && newPassword.length == 0 && repeatNewPassword.length == 0) {
      setInputsError({ ...inputsError, oldPassError: true, newPassError: true, repNewPass: true })
      return
    }

    if (newPassword.length == 0) {
      setInputsError({ ...inputsError, newPassError: true })
      return
    }
    if (repeatNewPassword.length == 0) {
      setInputsError({ ...inputsError, repNewPass: true })
    }
    if (newPassword != repeatNewPassword) {
      setInputsError({ ...inputsError, newPassError: true, repNewPass: true })
      setNewAndRepeatPassText('Поля не совпадает')
    }

    const firstPartOfCondition = oldPassword.length > 8 && newPassword.length > 0 && repeatNewPassword.length > 0
    const secondPartOfCondition = newPassword == repeatNewPassword && isValid
    const cond = firstPartOfCondition && secondPartOfCondition

    if (cond) {
      const data = await updateUserPassword(dispatch, oldPassword, user.id, newPassword)

      if (data.status != 200) {
        setOldPassText('Неверный пароль')
        setInputsError({ ...inputsError, oldPassError: true })
        return
      }
      dispatch(_getUserInfo(data.user))
      resetAllFieldsAndStates()
    }
  }

  function oldPassHandler(e) {
    setOldPassword(e.target.value)
    if (e.target.value.length < 8 || e.target.value.length > 10) {
      setInputsError({ ...inputsError, oldPassError: true })
      setIsValid(false)
      setOldPassText("Пароль должен быть максимум 10 символов")
      return
    }
    if (e.target.value.length == 0) {
      setInputsError({ ...inputsError, oldPassError: true })
      setIsValid(false)
      setOldPassText("Заполните поле")
      return
    }
    setInputsError({ ...inputsError, oldPassError: false })
    setNewAndRepeatPassText('Заполните поле')
    setIsValid(true)
  }

  function newPassHandler(e) {
    setNewPassword(e.target.value)
    if (e.target.value.length < 8 || e.target.value.length > 10 && e.target.value != repeatNewPassword) {
      setInputsError({ ...inputsError, newPassError: true })
      setNewAndRepeatPassText('Пароль должен быть максимум 10 символов')
      setIsValid(false)

      return
    }
    setInputsError({ ...inputsError, repNewPass: false, newPassError: false })
    setIsValid(true)
  }

  function mewPassRepeatHandler(e) {
    setRepeatNewPassword(e.target.value)
    if (e.target.value.length < 8 || e.target.value.length > 10 && e.target.value != newPassword) {
      setNewAndRepeatPassText('Пароль должен быть максимум 10 символов')
      setInputsError({ ...inputsError, repNewPass: true })
      setIsValid(false)
      return
    }
    setInputsError({ ...inputsError, repNewPass: false, newPassError: false })
    setIsValid(true)
  }

  return (
    <div className={fpm.forgotpassword} style={active ? { display: 'block' } : null}>
      <div className={fpm.forgotpassword__inner}>
        <div className={fpm.forgotpassword__modal}>
          <div className={fpm.forgotpassword__modaTtop}>
            <h1>Редактирование пароля</h1>
            <div className={fpm.forgotpassword__modalImg}>
              <img onClick={resetAllFieldsAndStates} src={closeGraySvg} alt='' />
            </div>
          </div>
          <p>Пароль должен содержать от 8 до 10 символов, цифры и заглавные буквы</p>
          <form onSubmit={e => e.preventDefault()}>
            <div className={`${fpm.input} ${inputsError.oldPassError ? fpm.oldPassError : ''}`}>
              <label htmlFor=''>Старый пароль</label>
              <input
                value={oldPassword}
                onChange={e => oldPassHandler(e)}
                type='text'
                placeholder='Введите старый пароль'
                autoComplete='off'
              />
            </div>
            <p style={inputsError.oldPassError ? { display: 'block' } : null}>{oldPassText}</p>

            <div className={`${fpm.input} ${inputsError.newPassError ? fpm.newPassError : ''}`}>
              <label htmlFor=''>Новый пароль</label>
              <input
                value={newPassword}
                onChange={e => newPassHandler(e)}
                type={showPassForNewPass ? 'text' : 'password'}
                placeholder='Введите новый пароль'
                autoComplete='off'
              />
              <img onClick={() => setShowPassForNewPass(!showPassForNewPass)} src={eye} alt='' />
            </div>
            <p style={inputsError.newPassError ? { display: 'block' } : null}>{newAndRepeatPassText}</p>

            <div className={`${fpm.input} ${inputsError.repNewPass ? fpm.repeatNewPassError : ''}`}>
              <label htmlFor=''>Повторить новый пароль</label>
              <input
                value={repeatNewPassword}
                onChange={e => mewPassRepeatHandler(e)}
                type={showPassForRepeatNewPass ? 'text' : 'password'}
                placeholder='Повторите новый пароль'
                autoComplete='off'
              />
              <img onClick={() => setShowPassForRepeatNewPass(!showPassForRepeatNewPass)} src={eye} alt='' />
            </div>
            <p style={inputsError.repNewPass ? { display: 'block' } : null}>{newAndRepeatPassText}</p>

            <div className={fpm.forgotpassword__modalBtns}>
              <GrayBtn func={resetAllFieldsAndStates}>Отменить</GrayBtn>
              <BlueBtn func={updatePassword}>Сохранить</BlueBtn>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
