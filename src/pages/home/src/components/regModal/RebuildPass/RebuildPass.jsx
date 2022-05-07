import React from "react";
import {closeGraySvg } from 'img'
import bb from "../../../Styles/StyleModul/BlueBtn.module.scss"
import gb from "../../../Styles/StyleModul/GreyBtn.module.scss"
import { Link } from "react-router-dom";
import "../../../Styles/rebuildPassword.scss"
import { useState } from "react";
import { rebuildPassword } from "redux/asyncRedux/UserAuthAsync";

const RebuildPass = (props) => {
  const [validation, setValidation] = useState(false)

  const [inputsErrors, setInputsErrors] = useState({
    emailError: false,
    passwordError: false
  })

  const [errorText, setErrorText] = useState({
    emailText: 'Введите email',
    passwordText: 'Введите пароль'
  })

  const [email, setEmail] = useState('')

  function emailHandler (e) {
    const regex = /^(([0-9A-Za-z^{}[\]<>\.;:_]{1,3}[0-9A-Za-z-\.]{1,}[0-9A-Za-z]{1})@([A-Za-z0-9]{1,}\.){1,2}[A-Za-z]{2,5})$/
    setEmail(e.target.value)
    checkInputContent(regex, e, 'emailError')
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

  const closeExit = () => {
    props.setPop('non_active')
  }
  const rebuild = () => {
    if(!inputsErrors.emailError){
      rebuildPassword(email)
      props.setActive(false)
      props.setPop('non_active')
    }
    
  }
  
  if('non_active' === props.activePop){
    return(<div className={props.active}></div>)
  }
  return(
    <div className="container_reb">
      <div className="reb_wrapper">
        <div className="reb_head">
          <h2 className="reb_zag">Получить новый пароль?</h2>
          <img src={closeGraySvg} onClick = {closeExit} className="close_reb" />
        </div>
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
                <p className={`${inputsErrors.emailError ? 'activeInputError' : 'non_active'}`}>
                  {errorText.emailText}
                </p>
              </li>
        <div className="reb_footer">
          <div className="btns_cont">
            <button onClick = {closeExit}  className={gb.btn}>Отмена</button>
              <button onClick={rebuild} className={bb.btn}>Получить</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default RebuildPass