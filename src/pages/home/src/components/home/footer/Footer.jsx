import React, { useState } from 'react'
import '../../../Styles/footer.scss'
import Money from '../../../img/stickers/money.png'
import Logo from '../../../img/logo.svg'
import BlueBtn from 'ui/btns/BlueBtn'
import HeaderBtn from '../../../UI/Buttons/HeaderBtn'
import Registraton from '../../regModal/Registraton'
import { Link } from 'react-router-dom'
import Login from '../../regModal/Login'
import { telegram, telegramSvg } from 'img'

function Footer () {
  const [active, setActive] = useState(false)
  const [activeLoginModal, setActiveLoginModal] = useState(false)
  const body = document.getElementsByTagName('body')

  function openModal () {
    setActive(true)
    body[0].style.overflow = 'hidden'
  }

  function openLoginModal () {
    setActiveLoginModal(true)
    body[0].style.overflow = 'hidden'
  }

  return (
    <div className='footer'>
      <div className='homepage__container'>
        <div className='footer__info'>
          <div className='footer__info-img-wrapp'>
            <img src={Money} alt='' className='footer__info-img' />
          </div>
          <h1 className='footer__info-title'> На огонь, воду и рост продаж можно смотреть бесконечно</h1>
          <p className='footer__info-text'>Мы даем вам 7 дней на испытание BOOSTCRM абсолютно бесплатно </p>
          <button className='btn_free_experience' onClick={openModal}>Попробовать бесплатно</button>
        </div>

        <div className='footer__bottom'>
          <div className='footer__bottom-navleft'>
            <div className='footer__bottom-navlogo'>
              <a href='/' className='header__nav-logo-img'>
                <img src={Logo} alt='' />
              </a>
            </div>
            <ul className='footer__bottom-navlinks'>
              <li className='footer__bottom-navlink'>
                <a href='#whycrm'>
                  Преимущества
                </a>
              </li>
              <li className='footer__bottom-navlink'>
                <a href='#free'>
                  Стоимость
                </a>
              </li>
              <li className='footer__bottom-navlink'>
                <Link to={'./blog'}>
                  Блог
                </Link>
              </li>
            </ul>
          </div>

          <div className='footer__bottom-right'>
            <HeaderBtn func={openModal} />
            <a onClick={() => openLoginModal()} className='header__nav-login'><span>Войти</span><span></span></a>
          </div>
        </div>
        <div className='footer__bottom-copyright'>
          <div className='footer__bottom-copyright-left'>
            <h3>© 2021 BOOSTCRM</h3>
            <a href='https://t.me/ralphfr1sko'>
              <img src={telegramSvg} alt='' />
              @ralphfr1sko
            </a>
          </div>
          <ul>
            <li>
              <Link to='/userAgreement'>
                Пользовательское соглашение
              </Link>
            </li>
            <li>
              <Link to='/policy'>
                Политика конфиденциальности
              </Link>
            </li>
            <li>
              <Link to='/license'>
                Реквизиты
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Registraton body={body} active={active} setActive={setActive} />
      <Login body={body} active={activeLoginModal} setActive={setActiveLoginModal} />
    </div>
  )
}

export default Footer
