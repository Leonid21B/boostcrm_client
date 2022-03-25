import React from 'react'
import '../../../Styles/whycrm.scss'
import cmst from '../../../Styles/StyleModul/CommonStyle.module.scss'

function WhyCrm () {
  return (
    <div className='whycrm' id='whycrm'>
      <div className='homepage__container'>
        <h1 className={cmst.mail__title} style={{ color: '#FFFFFF' }}>Зачем мне CRM-система?</h1>
        <div className='whycrm__items'>
          <div className='whycrm__items-top'>
            <ul>
              <li className='whycrm__item-top'>
                <span className='whycrm__item-title'>Единое окно</span>
                <p className='whycrm__item-text'>Объединить зоопарк систем и сервисов в единое окно, между которыми приходится постоянно переключаться</p>
              </li>
              <li className='whycrm__item-top'>
                <span className='whycrm__item-title'>Автоматизация</span>
                <p className='whycrm__item-text'>Минимизировать ручной труд, который приводит к потере времени и ошибкам во всех процессах</p>
              </li>
              <li className='whycrm__item-top'>
                <span className='whycrm__item-title'>Цикл продаж</span>
                <p className='whycrm__item-text'>Автоматизировать полный цикл продаж в b2b, b2c и d2c</p>
              </li>
            </ul>
          </div>

          <div className='whycrm__items-bottom'>
            <ul>
              <li className='whycrm__item-bottom'>
                <span className='whycrm__item-title'>Соцсети</span>
                <p className='whycrm__item-text'>Продавать в мессенджерах и социальных сетях</p>
              </li>
              <li className='whycrm__item-bottom'>
                <span className='whycrm__item-title'>Контроль</span>
                <p className='whycrm__item-text'>Прозрачно контролировать менеджеров</p>
              </li>
              <li className='whycrm__item-bottom'>
                <span className='whycrm__item-title'>Маркетинг</span>
                <p className='whycrm__item-text'>Использовать инструменты CRM- и email-маркетинга</p>
              </li>
              <li className='whycrm__item-bottom'>
                <span className='whycrm__item-title'>Программа лояльности</span>
                <p className='whycrm__item-text'>апустить омниканальную программу лояльности за 30 минут и стимулировать клиентов к повторным покупкам</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  )
}

export default WhyCrm
