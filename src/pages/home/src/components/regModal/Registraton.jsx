import phoneMaskValid from 'functions/phoneMask'
import { close, emptyAvatar } from 'img'
import React, { useEffect, useRef, useState } from 'react'
import { useIMask } from 'react-imask'
import { useSelector, useDispatch } from 'react-redux'

import { registration } from 'redux/asyncRedux/UserAuthAsync'
import BlueBtn from 'ui/btns/BlueBtn'
import '../../Styles/StyleModul/reggistration.scss'
import Countries from './Countries/Countries'

function Registraton ({ body, active, setActive, setActiveSuccessRegistrationModal }) {
  const refPhone = useRef()
  const dispatch = useDispatch()
  const [fio, setFio] = useState('')
  const [email, setEmail] = useState('')

  const [country, setCountry] = useState('1')
  const [tel, setTel] = useState(phoneMaskValid(null,null,country.length + 1,country).strNew)
  
  // const [telMask, setTelMask] = useState({ mask: '+{7} (000) 000 00 00' })
  // const { ref, maskRef } = useIMask(telMask)

  const { authUser } = useSelector(state => state.user)

  const [inputErrorState, setInputErrorState] = useState({
    nameError: false,
    emailError: false,
    telError: false
  })

  const [emailText, setEmailText] = useState('Введите email')

  const [validation, setValidation] = useState(false)

  function exitHandler () {
    setActive(false)
    body[0].style.overflowY = 'scroll'
    resetInputs()
  }

  function resetInputs () {
    setFio('')
    setEmail('')
    setTel('')
    setInputErrorState({
      ...inputErrorState, nameError: false, emailError: false, telError: false
    })
    setEmailText('Введите email')
  }

  let GB = 1
  async function reg () {
    if (fio.length > 1 && email.length != 0 && tel.length != 0 && validation) {
      if (JSON.parse(localStorage.getItem('GB'))) {
        GB = JSON.parse(localStorage.getItem('GB'))
      }
      const resp = await registration(dispatch, fio, email, tel, GB > 11 ? 11 : GB)
      if (resp.resp.status != 403) {
        setInputErrorState({
          ...inputErrorState, nameError: false, emailError: false, telError: false
        })
        setEmailText('Введите email')
        setActiveSuccessRegistrationModal(true)
        setActive(false)
        resetInputs()
        return
      }
      setInputErrorState({ ...inputErrorState, emailError: true })
      setEmailText('Такой пользователь уже есть')
    }

    if (fio.length == 0 && email.length == 0 && tel.length == 0) {
      setInputErrorState({
        ...inputErrorState, nameError: true, emailError: true, telError: true
      })
      return
    }

    if (fio.length == 0 && email.length == 0) {
      setInputErrorState({
        ...inputErrorState, nameError: true, emailError: true
      })
      return
    }

    if (fio.length == 0 && tel.length == 0) {
      setInputErrorState({
        ...inputErrorState, nameError: true, telError: true
      })
      return
    }
    if (email.length == 0 && tel.length) {
      setInputErrorState({
        ...inputErrorState, emailError: true, telError: true
      })
    }
  }

  useEffect(() => {
  }, [authUser])

  function fioHandler (e) {
    setFio(e.target.value)
    if (e.target.value.length > 0) {
      setInputErrorState({
        ...inputErrorState, nameError: false
      })
      return
    }
    setInputErrorState({
      ...inputErrorState, nameError: true
    })
  }

  function emailHandler (e) {
    const regex = [/^(([0-9A-Za-z^{}[\]<>\.;:_]{1,3}[0-9A-Za-z\.]{1,}[0-9A-Za-z]{1})@([A-Za-z0-9]{1,}\.){1,2}[A-Za-z]{2,5})$/]
    setEmail(e.target.value)
    checkInputContent(regex, e, 'emailError')
    
  }

  function setPos(num,e){
    setTimeout(() => {refPhone.current.selectionStart = refPhone.current.selectionEnd = num},0) 
  }

  function telHandler (e) {
    const regex = [/^\+([0-9]{1} \([0-9]{3}\) [0-9]{3} [0-9]{2} [0-9]{2})$/,/^\+([0-9]{2} \([0-9]{3}\) [0-9]{3} [0-9]{2} [0-9]{2})$/,/^\+([0-9]{3} \([0-9]{3}\) [0-9]{3} [0-9]{2} [0-9]{2})$/]
    let data = phoneMaskValid(e.target.value,tel,e.target.selectionStart ,country)
    setTel(data.strNew)
    setPos(data.numb, e)
    checkInputContent(regex, e, 'telError')

  }

  function checkInputContent (regex, e, type) {
    for (let item of regex){
      if (item.test(String(e.target.value).toLocaleLowerCase())) {
        setInputErrorState({ ...inputErrorState, [type]: false })
        setValidation(true)
        return
      }
    }
    setInputErrorState({ ...inputErrorState, [type]: true })
    setValidation(false)
    
  }


  return (
    <div className='reg' style={active ? { display: 'block' } : null}>
      <div className='reg__inner'>
        <div className='reg__modal'>
          <div className='reg__modal-top'>
            <h1>Регистрация</h1>
            <img onClick={exitHandler} src={close} alt='' />
          </div>
          <span>Данные для доступа придут вам на почту</span>
          <form onSubmit={e => e.preventDefault()}>
            <ul>
              <li>
                <label htmlFor='fio'>Ф.И.О</label>
                <div className={`reg__input ${inputErrorState.nameError ? ' errorInputName' : null}`}>
                  <input
                    type='text'
                    name='fio'
                    value={fio} onChange={e => fioHandler(e)}
                    autoComplete='off'
                    className={`${inputErrorState.nameError ? 'nameError' : null}`}
                    maxLength={20}
                  />
                </div>
                <p className={inputErrorState.nameError ? 'activeInputError' : null}>Введите имя</p>
              </li>
              <li>
                <label htmlFor='email'>E-mail</label>
                <div className={`reg__input ${inputErrorState.emailError ? 'errorInputEmail' : null}`}>
                  <input
                    type='email'
                    
                    name='email'
                    value={email} onChange={e => emailHandler(e)}
                    autoComplete='off'
                    className={`${inputErrorState.emailError ? 'emailError' : null}`}
                    maxLength={40}
                  />
                </div>
                <p className={inputErrorState.emailError ? 'activeInputError' : null}>{emailText}</p>
              </li>
              <li>
                <label htmlFor='tel'>Телефон</label>
                <p>Выберите код страны</p>
                <Countries setTel = {setTel} setCountry = {setCountry}/>
                <div className={`reg__input ${inputErrorState.telError ? 'errorInputTel' : null} `}>
                  <input
                    placeholder={`+${country} (987) 654 32 10`}
                    ref={ refPhone }
                    type='tel'
                    name='tel'
                    value={tel} onChange={e => telHandler(e)}
                    autoComplete='off'
                    className={`${inputErrorState.telError ? 'telError' : null}`}
                  />
                </div>
                <p className={inputErrorState.telError ? 'activeInputError' : null}>Введите телефон</p>
              </li>
            </ul>
            <div className='reg__btn'>
              <BlueBtn func={reg}>Зарегестрироваться</BlueBtn>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Registraton