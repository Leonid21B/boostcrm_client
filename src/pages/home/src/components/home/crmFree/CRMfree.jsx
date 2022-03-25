import React, { useEffect, useRef, useState } from 'react'
import '../../../Styles/crmfree.scss'
import Smile from '../../../img/stickers/love.png'
import Person from '../../../img/icons/crmfree1.svg'
import Lines from '../../../img/icons/crmfree2.svg'
import Graff from '../../../img/icons/crmfree3.svg'
import Phone from '../../../img/icons/crmfree4.svg'
import BlueBtn from 'ui/btns/BlueBtn'
import cmst from '../../../Styles/StyleModul/CommonStyle.module.scss'
import Registraton from '../../regModal/Registraton'

function CRMfree () {
  const sliderRef = useRef()
  const sumRef = useRef()

  const [taskenplace, setTaskenplace] = useState('0')
  const [triger, setTriger] = useState(false)

  const [currentTarifPlace, setCurrentTarifPlace] = useState('5')

  const [gigabytes, setGigabytes] = useState(currentTarifPlace)
  const [price, setPrice] = useState(gigabytes * 8 + 2)

  const [startPosition, setStartPosition] = useState(currentTarifPlace)

  const [coefficient, setСoefficient] = useState('0')

  const body = document.getElementsByTagName('body')
  const [activeModal, setActiveModal] = useState(false)

  const [maxSliderValue, setMaxSliderValue] = useState(0)

  function customSlier () {
    setTriger(true)
    const maxVal = sliderRef.current.querySelector('.slider').getAttribute('max')
    const minVal = sliderRef.current.querySelector('.slider').getAttribute('min')
    const val = (sliderRef.current.querySelector('.slider').value / maxVal) * 100 + '%'

    setGigabytes(sliderRef.current.querySelector('.slider').value)
    setPrice(
      sliderRef.current.querySelector('.slider').value != 0
        ? sliderRef.current.querySelector('.slider').value * 8 + 2
        : 0
    )

    sliderRef.current.querySelector('.progress').style.width = val
    sliderRef.current.querySelector('.slider__thumb').style.left = val

    localStorage.setItem('GB', JSON.stringify(sliderRef.current.querySelector('.slider').value))

    switch (sliderRef.current.querySelector('.slider').value) {
      case maxVal:
        setMaxSliderValue(maxVal)
        setGigabytes('Безлимит')
        setPrice('цена по запросу')
        sliderRef.current.querySelector('.tooltip').style.width = '300px'
        sliderRef.current.querySelector('.tooltip').style.left = '-240%'
        // sumRef.current.innerHTML = `Безлимит / цена по запросу`
        break
      case minVal:
        sliderRef.current.querySelector('.tooltip').style.width = '300px'
        sliderRef.current.querySelector('.tooltip').style.left = '120%'
        break

      default:
        sliderRef.current.querySelector('.tooltip').style.width = '150px'
        sliderRef.current.querySelector('.tooltip').style.left = '50%'
        setMaxSliderValue(2)
        break
    }
  }

  useEffect(() => {
    setСoefficient(
      (sliderRef.current.querySelector('.slider').getAttribute('step') /
                sliderRef.current.querySelector('.slider').getAttribute('max')) * 100
    )
  }, [])

  function plugTarif () {
    setActiveModal(true)
    body[0].style.overflow = 'hidden'
  }

  return (
    <div className='crmfree' id='free'>
      <div className='homepage__container'>
        <div className='crmfree__inner'>

          <div className='crmfree__info'>
            <div className='crmfree__info-img-wrapp'>
              <img src={Smile} alt='' className='crmfree__info-img' />
            </div>
            <h1 className={cmst.mail__title}> <span>BOOST</span>CRM БЕСПЛАТНАЯ!</h1>
            <p className='crmfree__info-text'>Вы платите только за хранение данных</p>
          </div>

          <ul className='crmfree__items'>
            <li className='crmfree__item'>
              <div className='crmfree__item-img'>
                <img src={Person} alt='' />
              </div>
              <span className='crmfree__item-text'>Безлимитные пользователи </span>
            </li>
            <li className='crmfree__item'>
              <div className='crmfree__item-img'>
                <img src={Lines} alt='' />
              </div>
              <span className='crmfree__item-text'>Безлимитные <br /> воронки продаж</span>
            </li>
            <li className='crmfree__item'>
              <div className='crmfree__item-img'>
                <img src={Graff} alt='' />
              </div>
              <span className='crmfree__item-text'>Полная аналитика </span>
            </li>
            <li className='crmfree__item'>
              <div className='crmfree__item-img'>
                <img src={Phone} alt='' />
              </div>
              <span className='crmfree__item-text'>Полная аналитика</span>
            </li>
          </ul>

          <div className='crmfree__data'>
            <h2 className='crmfree__data-title'>Выберите объем информации</h2>
            <div className='crmfree__data-input'>
              <div className='tarif__block-calculator'>

                <div ref={sliderRef} className='range__slider'>
                  <input type='range' min={0} max={11} step={1} onChange={customSlier} className='slider' />
                  <div style={{ left: startPosition * coefficient + '%' }} className='slider__thumb'>
                    <div className='tooltip'>
                      {
                                                maxSliderValue != 11
                                                  ? `${gigabytes} ГБ / ${price}$`
                                                  : 'Безлимит цена по запросу'
                                            }
                    </div>
                  </div>

                  <div style={{ width: startPosition * coefficient + '%' }} className='progress' />
                  <div
                    style={
                                        taskenplace != '0' ? { width: taskenplace * coefficient + '%' } : { display: 'none' }
} className='progress__taken'
                  />
                </div>
              </div>
              <div className='crmfree__data-price'>
                <span ref={sumRef}>
                  {
                                        maxSliderValue != 11
                                          ? `${gigabytes} ГБ / ${price}$`
                                          : 'Безлимит цена по запросу'
                                    }
                </span>
                <BlueBtn func={plugTarif}>Подключить</BlueBtn>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Registraton body={body} active={activeModal} setActive={setActiveModal} />
    </div>
  )
}

export default CRMfree
