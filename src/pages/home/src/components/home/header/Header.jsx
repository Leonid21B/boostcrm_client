import SuccesRegistrationModal from 'componentStore/modals/SuccesRegistrationModal'
import React, { useEffect, useState } from 'react'
import Logo from '../../../img/logo.svg'
import '../../../Styles/header.scss'
import HeaderBtn from '../../../UI/Buttons/HeaderBtn'
import Login from '../../regModal/Login'
import Registraton from '../../regModal/Registraton'
import { Link } from 'react-router-dom'
function Header () {
  const [activeStartFoFree, setActiveStartFoFree] = useState(false)
  const [activeLogin, setActiveLogin] = useState(false)
  const [activeSuccessRegistrationModal, setActiveSuccessRegistrationModal] = useState(false)
  const [successRegistration, setSuccessRegistration] = useState(false)

  const body = document.getElementsByTagName('body')

  function activeStartFoFreeHandler () {
    return () => {
      setActiveStartFoFree(true)
      body[0].style.overflowY = 'hidden'
      console.log('body.style', body[0].style)
    }
  }
  useEffect(() => {
    const div = document.querySelector('.wrapper')
    console.log(div)
    div.classList.add('wrapper_white')
    return () => { div.classList.remove('wrapper_white')}
  }, [])
  function activeLoginHandler () {
    return () => {
      setActiveLogin(true)
      body[0].style.overflowY = 'hidden'
      console.log('body.style', body[0].style)
    }
  }

  function slowScrollToBlock (e, where) {
    e.preventDefault()
    const targetScroll = document.getElementById(where)
    const elementPosition = targetScroll.getBoundingClientRect().top
    window.scrollBy({
      top: elementPosition,
      behavior: 'smooth'
    })
  }

  return (
    <div className='header'>
      <div className='homepage__container'>
        <div className='header__inner'>
          <div className='header__nav-left'>
            <div className='header__nav-logo'>
              <a id='header__nav' href='#' className='header__nav-logo-img'>
                <img src={Logo} alt='' />
              </a>
            </div>
            <ul className='header__nav-links'>
              <li className='header__nav-link'>
                <a className='header__nav' onClick={e => slowScrollToBlock(e, 'whycrm')} href='#whycrm'>
                  Преимущества
                </a>
              </li>
              <li className='header__nav-link'>
                <a className='header__nav' onClick={e => slowScrollToBlock(e, 'free')} href='#free'>
                  Стоимость
                </a>
              </li> 
              <li className='header__nav-link'>
                <Link to={'./blog'}>
                  Блог
                </Link>
              </li>
            </ul>
          </div>

          <div className='header__nav-right'>
            <HeaderBtn func={activeStartFoFreeHandler()} />
            <a onClick={activeLoginHandler()} className='header__nav-login'><span>Войти</span><span></span></a>
          </div>
        </div>
      </div>
      <Registraton
        body={body}
        active={activeStartFoFree}
        setActive={setActiveStartFoFree}
        setActiveSuccessRegistrationModal={setActiveSuccessRegistrationModal}
      />
      <Login body={body} active={activeLogin} setActive={setActiveLogin} />
      <SuccesRegistrationModal
        body={body}
        active={activeSuccessRegistrationModal}
        setActive={setActiveSuccessRegistrationModal}
      />
    </div>
  )
}

export default Header
