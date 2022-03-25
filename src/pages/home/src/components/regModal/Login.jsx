import { close } from 'img'
import React, { useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from 'redux/asyncRedux/UserAuthAsync'
import { ContentStatesStore } from 'StoreStates'
import BlueBtn from 'ui/btns/BlueBtn'
import '../../Styles/StyleModul/reggistration.scss'

function Login ({ body, active, setActive }) {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { isLoading, setIsLoading, setIsLoaded } = useContext(ContentStatesStore)

  const [inputsErrors, setInputsErrors] = useState({
    emailError: false,
    passwordError: false
  })

  const [errorText, setErrorText] = useState({
    emailText: 'Введите email',
    passwordText: 'Введите пароль'
  })

  const [validation, setValidation] = useState(false)

  function exitHandler () {
    setActive(false)
    document.getElementsByTagName('body')[0].style.overflowY = 'scroll'
    resetInputs()
  }

  function resetInputs () {
    setEmail('')
    setPassword('')
    setInputsErrors({ ...inputsErrors, emailError: false, passwordError: false })
    setValidation(false)
    setErrorText({ ...errorText, emailText: 'Введите email', passwordText: 'Введите пароль' })
    document.getElementsByTagName('body')[0].style.overflowY = 'scroll'
  }

  async function loginUser () {
    try {
      if (email.length == 0 && password.length == 0) {
        setInputsErrors({ ...inputsErrors, emailError: true, passwordError: true })
        return
      }
      if (email.length == 0) {
        setInputsErrors({ ...inputsErrors, emailError: true })
        return
      }
      if (password.length == 0) {
        setInputsErrors({ ...inputsErrors, passwordError: true })
        return
      }
      if (email.length != 0 && password.length != 0 && validation) {
        const resp = await login(dispatch, email, password, body[0])

        if (resp.status == 404) {
          setInputsErrors({ ...inputsErrors, emailError: true })
          setErrorText({ ...errorText, emailText: 'Пользователь не найден' })
          console.log('resp', resp)
          return
        }
        if (resp.status == 403) {
          setInputsErrors({ ...inputsErrors, passwordError: true })
          setErrorText({ ...errorText, passwordText: 'Неверный пароль' })
          return
        }
        resetInputs()
        return
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoaded(false)
    }
  }
  function emailHandler (e) {
    const regex = /^(([0-9A-Za-z^{}[\]<>\.;:_]{1,3}[0-9A-Za-z\.]{1,}[0-9A-Za-z]{1})@([A-Za-z0-9]{1,}\.){1,2}[A-Za-z]{2,5})$/
    setEmail(e.target.value)
    checkInputContent(regex, e, 'emailError')
  }
  function passwordHandler (e) {
    const regex = /^.{8,10}$/
    setPassword(e.target.value)
    checkInputContent(regex, e, 'passwordError')
  }

  function checkInputContent (regex, e, type) {
    if (!regex.test(String(e.target.value).toLowerCase())) {
      setInputsErrors({ ...inputsErrors, [type]: true })
      setValidation(false)
      return
    }
    setValidation(true)
    setInputsErrors({ ...inputsErrors, [type]: false })
  }

  return (
    <div className='reg' style={active ? { display: 'block' } : null}>
      <div className='reg__inner'>
        <div className='reg__modal'>
          <div className='reg__modal-top'>
            <h1>Вход</h1>
            <img onClick={() => exitHandler()} src={close} alt='' />
          </div>
          <span>Данные для доступа придут вам на почту</span>
          <form onSubmit={e => e.preventDefault()}>
            <ul>
              <li>
                <label htmlFor='email'>E-mail</label>
                <div className={`log__input ${inputsErrors.emailError ? 'errorInputEmail' : null}`}>
                  <input
                    type='email'
                    name='email'
                    value={email}
                    onChange={e => emailHandler(e)}
                    className={`${inputsErrors.emailError ? 'emailError' : null}`}
                    maxLength={40}
                  />
                </div>
                <p className={`${inputsErrors.emailError ? 'activeInputError' : null}`}>
                  {errorText.emailText}
                </p>
              </li>
              <li>
                <label htmlFor='password'>Пароль</label>
                <div className={`log__input ${inputsErrors.passwordError ? 'errorInputPassword' : null}`}>
                  <input
                    type='password'
                    name='password'
                    value={password}
                    onChange={e => passwordHandler(e)}
                    className={`${inputsErrors.passwordError ? 'passwordError' : null}`}
                    maxLength={12}
                  />
                </div>
                <p className={`${inputsErrors.passwordError ? 'activeInputError' : null}`}>
                  {errorText.passwordText}
                </p>
              </li>
            </ul>
            <div className='reg__btn'>
              <BlueBtn func={loginUser}>Войти</BlueBtn>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Login
