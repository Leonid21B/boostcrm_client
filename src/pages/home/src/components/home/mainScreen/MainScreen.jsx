import React, { useState } from 'react'
import 'pages/home/src/Styles/mainScreen.scss'
import Hand from 'pages/home/src/img/stickers/hands.png'
import Finger from 'pages/home/src/img/stickers/finger.png'
import Muscule from 'pages/home/src/img/stickers/muscule.png'
import BlueBtn from 'ui/btns/BlueBtn'
import cmst from 'pages/home/src/Styles/StyleModul/CommonStyle.module.scss'
import Registraton from '../../regModal/Registraton'
function MainScreen () {
  const body = document.getElementsByTagName('body')

  const [active, setActive] = useState(false)

  function openModal () {
    setActive(true)
    body[0].style.overflow = 'hidden'
  }

  return (
    <div className='main__screen'>
      <div className='homepage__container'>
        <div className='main__screen-info'>
          <h1 className={cmst.mail__title}>
            Добавьте 🔥🔥🔥 продажам с помощью <span>BOOST</span>CRM
          </h1>
          <p className='main__screen-text'>Деньги — это кровь любого бинеса.<br />
            BOOSTCRM увеличивает продажи, с помощью трех удобных функций
          </p>
        </div>
        <div className='main__screen-subinfo'>
          <ul className='main__screen-items'>
            <li className='main__screen-item'>
              <div className='main__screen-item img'>
                <img src={Hand} alt='' />
              </div>
              <h3 className='main__screen-item title'>Все как на ладони</h3>
              <p className='main__screen-item text'>Аналитика текущиз продаж компании в реальном времени</p>
            </li>
            <li className='main__screen-item'>
              <div className='main__screen-item img'>
                <img src={Finger} alt='' />
              </div>
              <h3 className='main__screen-item title'>От малого до великого</h3>
              <p className='main__screen-item text'>Безлимитное количество пользователей, и воронок продаж</p>
            </li>
            <li className='main__screen-item'>
              <div className='main__screen-item img'>
                <img src={Muscule} alt='' />
              </div>
              <h3 className='main__screen-item title'>Сэкономил - заработал!</h3>
              <p className='main__screen-item text'>Оплата только за хранение данных. Единый тариф для всех и каждого</p>
            </li>
          </ul>
          <BlueBtn func={openModal}>Попробовать бесплатно</BlueBtn>
        </div>
      </div>
      <Registraton body={body} active={active} setActive={setActive} />
    </div>
  )
}

export default MainScreen
