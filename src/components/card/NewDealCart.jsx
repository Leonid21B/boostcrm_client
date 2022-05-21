import React, { useState } from 'react'
import BlueBtn from 'ui/btns/BlueBtn'
import GrayBtn from 'ui/btns/GrayBtn'
import { useDispatch, useSelector } from 'react-redux'
import ip from 'ui/scssModule/input.module.scss'

import { useIMask } from 'react-imask'
import { createAndSaveCart } from 'redux/asyncRedux/CreateCart'

import { clear } from 'img'
import { allowOnlyNumbersInInput, createCard, onlyNumber } from './functions/createNewCardHandlers'

function NewDealCart ({ stageID, currentStage, setStageId }) {
  const [telMask, setTelMask] = useState({ mask: '+{7} (000) 000 00 00' })
  const { ref, maskRef } = useIMask(telMask)

  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [person, setPerson] = useState('')
  const [price, setPrice] = useState('')
  const [tel, setTel] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [addNenTask, setAddNenTask] = useState(false)
  const values = [[90, '€'], [80, '$'], [1, '₽']]
  const currency = useSelector(state => state.user.user?.currency)
  const [inputTitleError, setInputTitleError] = useState(false)
  const [inputEmailError, setInputEmailError] = useState(false)
  const [inputCompanyError, setInputCompanyError] = useState(false)
  const [emailValidation, setEmailValidation] = useState(true)

  const [errorMessageState, setErrorMessageState] = useState({
    titleMessage: false,
    emailMessage: false,
    companyMessage: false
  })

  const { user } = useSelector(state => state.user)

  const dispatch = useDispatch()

  const data = {
    title,
    company,
    name: person,
    price: price * user.currency,
    tel,
    email,
    address,
    stageId: currentStage,
    userId: user?.id,
    comandId: user?.comandId
  }

  function resetInputsValues () {
    setTitle('')
    setCompany('')
    setPerson('')
    setPrice('')
    setTel('')
    setEmail('')
    setAddress('')
  }

  const cancelCart = () => {
    return () => {
      setStageId('')
      resetInputsValues()
      setErrorMessageState(
        { ...errorMessageState, titleMessage: false, emailMessage: false, companyMessage: false }
      )
      setInputTitleError(false)
      setInputEmailError(false)
      setInputCompanyError(false)
    }
  }

  function titleHandler (e) {
    setTitle(e.target.value)
    if (e.target.value.length > 0) {
      setInputTitleError(false)
      setErrorMessageState({ ...errorMessageState, titleMessage: false })
      return
    }
    setInputTitleError(true)
    setErrorMessageState({ ...errorMessageState, titleMessage: true })
  }

  function companyHandler (e) {
    setCompany(e.target.value)
    if (e.target.value.length > 0) {
      setInputCompanyError(false)
      setErrorMessageState({ ...errorMessageState, companyMessage: false })
      return
    }
    setInputCompanyError(true)
    setErrorMessageState({ ...errorMessageState, companyMessage: true })
  }

  function emailHandler (e) {
    const regex = /^(([0-9A-Za-z^<>()[\]|\.:;]{1,2}[0-9A-Za-z\.]{1,}[0-9A-Za-z]{1})@([A-Za-z]{1,}\.){1,2}[A-Za-z]{2,5})$/
    setEmail(e.target.value)
    if (!regex.test(String(e.target.value).toLowerCase()) && e.target.value !== 0) {
      setInputEmailError(true)
      setEmailValidation(false)
      setErrorMessageState({ ...errorMessageState, emailMessage: true })
      return
    }
    setEmailValidation(true)
    setInputEmailError(false)
    setErrorMessageState({ ...errorMessageState, emailMessage: false })
  }

  function clearInput (inputHandler) {
    return () => {
      inputHandler('')
    }
  }

  return (
    <div
      key={stageID}
      className='content__newCart'
      style={currentStage === stageID ? { display: 'block' } : null}
    >
      <span className='content__newCart-title'>Новая сделка</span>
      <div className='content__newCart-inputs'>
        <ul>
          <li className={`content__newCart-input 
                    ${title.length > 0 ? 'active' : null}
                     ${inputTitleError ? 'titleError' : null}`}
          >
            <input
              className={ip.inp}
              type='text'
              name='title'
              value={title}
              onChange={e => titleHandler(e)}
              placeholder='Название сделки*'
              autoComplete='off'
              maxLength={35}
            />
            <img onClick={clearInput(setTitle)} className='content__newCart-input-remove' src={clear} alt='' />
          </li>
          <p style={errorMessageState.titleMessage ? { display: 'block' } : null}>Введите название сделки</p>

          <li className={`content__newCart-input 
                    ${company.length > 1 ? 'active' : null}
                     ${inputCompanyError ? 'companyError' : null}`}
          >
            <input
              className={ip.inp}
              type='text'
              name='company'
              value={company}
              onChange={e => companyHandler(e)}
              placeholder='Название компании'
              autoComplete='off'
              maxLength={20}
            />
            <img onClick={clearInput(setCompany)} className='content__newCart-input-remove' src={clear} alt='' />
          </li>
          <p
            style={errorMessageState.companyMessage ? { display: 'block' } : null}
          >
            Введите название компании
          </p>

          <li className={`content__newCart-input ${person.length > 1 ? 'active' : null}`}>
            <input
              className={ip.inp}
              type='text'
              name='name'
              value={person}
              onChange={e => setPerson(e.target.value)}
              placeholder='Имя контакта'
              autoComplete='off'
              maxLength={20}
            />
            <img onClick={clearInput(setPerson)} className='content__newCart-input-remove' src={clear} alt='' />
          </li>
          <li className={`content__newCart-input ${price.length > 1 ? 'active' : null}`}>
            <input
              className={ip.inp}
              type='text'
              name='price'
              value={price}
              onChange={e => allowOnlyNumbersInInput(e.target.value, setPrice)}
              placeholder={(values?.filter(item => item[0] == currency)[0] && currency) ? `${values?.filter(item => item[0] == currency)[0][1]}` : '₽' }
              autoComplete='off'
              maxLength={9}
            />
            <img onClick={clearInput(setPrice)} className='content__newCart-input-remove' src={clear} alt='' />
          </li>
          <li className={`content__newCart-input ${tel.length > 1 ? 'active' : null}`}>
            <input
              className={ip.inp}
              type='tel'
              name='tel'
              value={tel}
              onChange={e => allowOnlyNumbersInInput(e.target.value, setTel)}
              placeholder='Телефон'
              autoComplete='off'
              maxLength={11}
            />
            <img onClick={clearInput(setTel)} className='content__newCart-input-remove' src={clear} alt='' />
          </li>
          <li className={`content__newCart-input
                     ${email.length > 1 ? 'active' : null} 
                     ${inputEmailError ? 'emailError' : null}`}
          >
            <input
              className={ip.inp}
              type='email'
              name='email'
              value={email}
              onChange={e => emailHandler(e)}
              placeholder='E-mail'
              autoComplete='off'
              maxLength={40}
            />
            <img onClick={clearInput(setEmail)} className='content__newCart-input-remove' src={clear} alt='' />
          </li>
          <p style={errorMessageState.emailMessage ? { display: 'block' } : null}>Введите email</p>

          <li className={`content__newCart-input ${address.length > 1 ? 'active' : null}`}>
            <textarea
              className='content__newCart-address'
              cols='30'
              rows='4'
              placeholder='Адрес'
              value={address}
              onChange={e => setAddress(e.target.value)}
              name='address'
              maxLength={30}
            />
            <img onClick={clearInput(setAddress)} className='content__newCart-input-remove' src={clear} alt='' />
          </li>
        </ul>

      </div>
      <div className='content__newCart-buttons'>
        <div className='content__newCart-btns'>
          <GrayBtn func={cancelCart()}>Отменить</GrayBtn>
          <BlueBtn func={createCard(
            {
              access: title.length && company.length,
              emptyFields: !title.length && !company.length,
              emptyTitle: !title.length,
              emptyCompanyTitle: !company.length
            },
            () => {
              if (emailValidation) {
                createAndSaveCart(dispatch, { ...data })
                setStageId('')
                resetInputsValues()
              }
            },
            () => {
              setInputTitleError(true)
              setInputCompanyError(true)
              setErrorMessageState(
                { ...errorMessageState, titleMessage: true, companyMessage: true }
              )
            },
            () => {
              setInputTitleError(true)
              setErrorMessageState({ ...errorMessageState, titleMessage: true })
            },
            () => {
              setInputCompanyError(true)
              setErrorMessageState({ ...errorMessageState, companyMessage: true })
            }
          )}
          >Сохранить
          </BlueBtn>
        </div>
      </div>
    </div>
  )
}

export default NewDealCart
