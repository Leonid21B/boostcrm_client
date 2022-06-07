import axios from 'axios'
import TopLine from 'componentStore/TopLine'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import 'scss/tarif.scss'
import BlueBtn from 'ui/btns/BlueBtn.jsx'
import { logOut } from 'redux/asyncRedux/UserAuthAsync'

import { formatFyllDate } from 'functions/FormatDate'
import bb from 'ui/scssModule/blueBtn.module.scss'
import HelpModal from 'componentStore/modals/HelpModal'
import { ContentStatesStore } from 'StoreStates'
import { getCompany } from 'redux/asyncRedux/ClientsAsync'

function Tarif () {
  const [active, setActive] = useState(false)

  const sliserRef = useRef()
  const dispatch = useDispatch()
  
 
  const { user } = useSelector(state => state.user)
  let currency = user?.currency
  useEffect(() => {
    currency = user?.currency
    if(currency == 90){
      setSymb('€')
    }
    if (currency == 80) {
      setSymb('$')
    }
    if (currency == 1) {
      setSymb('₽')
    }
    console.log(currency)
  },[user])
  

  const { space, takenSpace, paymentDate } = useSelector(state => state.companySpace)

  const [taskenplace, setTaskenplace] = useState(takenSpace)
  const [triger, setTriger] = useState(false)

  const [currentTarifPlace, setCurrentTarifPlace] = useState(space)

  const [currencySymb,setSymb] = useState('$')

  const [startPosition, setStartPosition] = useState(currentTarifPlace)

  const [coefficient, setСoefficient] = useState('0')

  const [GB, setGB] = useState(currentTarifPlace)
  const [priceGB, setPriceGB] = useState((currentTarifPlace * 8 + 2)  * 80 / currency)

  const [range, setRange] = useState(3)

  const [isMaxOfSliderRange, setIsMaxOfSliderRange] = useState(false)
  
  useEffect(() => {
    if(user?.id){
      getCompany(dispatch,user.id)
    }
  }, [user])
  const [isAutoPayState, setIsAutoPayState] = useState(false)
  const [dateDifferent, setDateDifferent] = useState(0)

  // const  BASE_SERVER_URL = 'https://boostcrm.ru:443/api'
  const BASE_SERVER_URL = 'http://localhost:5000/api'

  const { openHelpModal, setOpenHelpModal } = useContext(ContentStatesStore)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setСoefficient(
        (sliserRef.current.querySelector('.slider').getAttribute('step') /
                    sliserRef.current.querySelector('.slider').getAttribute('max')) * 100
      )
      return
    }
    logOut(dispatch)
  }, [])
  useEffect(() => {
    setDateDifferent(check(paymentDate))
  },[paymentDate])
  const closeModal = () => {
    setActive(false)
  }

  let maxVal = null
  let minVal = null
  let val = null

  function customSlier () {
    setTriger(true)
    maxVal = sliserRef.current.querySelector('.slider').getAttribute('max')
    minVal = sliserRef.current.querySelector('.slider').getAttribute('min')
    val = (sliserRef.current.querySelector('.slider').value / maxVal) * 100 + '%'

    setGB(sliserRef.current.querySelector('.slider').value)
    setPriceGB(
      sliserRef.current.querySelector('.slider').value != 0
        ? (sliserRef.current.querySelector('.slider').value * 8 + 2) * 80 / currency
        : 0
    )
    sliserRef.current.querySelector('.progress').style.width = val
    sliserRef.current.querySelector('.slider__thumb').style.left = val

    switch (sliserRef.current.querySelector('.slider').value) {
      case maxVal:
        sliserRef.current.querySelector('.tooltip').style.width = '300px'
        sliserRef.current.querySelector('.tooltip').style.left = '-240%'
        setRange(11)
        setIsMaxOfSliderRange(true)
        break
      case minVal:
        sliserRef.current.querySelector('.tooltip').style.width = '300px'
        sliserRef.current.querySelector('.tooltip').style.left = '120%'
        setRange(0)
        break
      default:
        sliserRef.current.querySelector('.tooltip').style.width = '150px'
        sliserRef.current.querySelector('.tooltip').style.left = '50%'
        setIsMaxOfSliderRange(false)
        setRange(sliserRef.current.querySelector('.slider').value)
        break
    }
  }
  const cur = useSelector(state => state.user.user.currency)
  function openPayModal (sum, space) {
    return async () => {
      if (!isMaxOfSliderRange) {
        const userId = user.id
        const data = await axios.get(`${BASE_SERVER_URL}/generatePay/${userId}/${sum * cur}/${isAutoPayState}/${space}`)
          .then(link => link.data)
        
        window.open(data,'_blank')
      }
    }
  }

  function setIsAutoPay (bool) {
    setIsAutoPayState(!bool)
  }
   
  function check (pDate) {   
    const date = new Date()
    const payDate = new Date(pDate)
    let timeDifferent = 0
    if (date.getTime() - payDate.getTime() >= 0 ){
      timeDifferent = 0
    }else{
      timeDifferent = Math.abs(date.getTime() - payDate.getTime())
    }
    
    const result = Math.ceil(timeDifferent / (1000 * 3600 * 24))
    console.log(result)
    return result
  }

  useEffect(() => {
    if (space != currentTarifPlace) {
      setCurrentTarifPlace(space)
      setStartPosition(space)
    }
  }, [space])

  function openHelpModalToCallUs () {
    setOpenHelpModal(true)
  }

  return (
    <div className='tarif'>

      <div
        className={`tarif__alert ${dateDifferent <= 3
                    ? 'active'
                    : space  - takenSpace <= 0
                        ? 'active'
                        : null}`}
      >
        {dateDifferent <= 3 ? <span>До конца оплаченного периода {dateDifferent + ' ' + `${dateDifferent == 1 ? 'сутки' : 'суток'}`}</span> : <span>У вас закончилась память</span>}
        {/* <span>Пополнить счет</span> */}
        <button onClick={openPayModal(priceGB, GB)}>Пополнить счет</button>
      </div>
      <div className='container'>
        <div
          className='tarif__inner'
          style={
                        dateDifferent <= 3
                          ? { paddingTop: '24px' }
                          : null
                    }
        >
          <TopLine title='Стоимость' />
          <div className='tarif__blocks'>
            <div className='tarif__block left'>
              <h3 className='tarif__block-title'>Ваш тариф</h3>
              <ul className='tarif__block-items'>
                <li className='tarif__block-item'>
                  <span>Объем</span>
                  <span>{currentTarifPlace} GB</span>
                </li>
                <li className='tarif__block-item'>
                  <span>Занято</span>
                  <span>
                    {takenSpace > 1
                      ? takenSpace
                      : takenSpace * 1024} {takenSpace > 1 ? 'GB' : 'MB'}   
                  </span>
                </li>
                <li className='tarif__block-item'>
                  <span>Оплата</span>
                  <span>{Math.round((currentTarifPlace * 8 + 2) * 80 / currency)} {currencySymb} </span>
                </li>
                <li className='tarif__block-item'>
                  <span>Списание</span>
                  <span>{formatFyllDate(paymentDate)}</span>
                </li>
              </ul>
              <h3 className='tarif__block-title calc-title'>Калькулятор</h3>

              <div className='tarif__block-calculator'>

                <div ref={sliserRef} className='range__slider'>
                  <input type='range' min={0} max={11} step={1} onChange={customSlier} className='slider' />
                  <div style={{ left: startPosition * coefficient + '%' }} className='slider__thumb'>
                    <div className='tooltip'>
                      {
                                                range == 11
                                                  ? 'Безлимит / цена по запросу'
                                                  : `${GB} GB / ${Math.round(priceGB)} ${currencySymb}`
                                            }
                    </div>
                  </div>
                  <div
                    style={
                                        triger ? { left: currentTarifPlace * coefficient + '%' } : { display: 'none' }
                                    } className='slider-current__thumb'
                  >
                    <div
                      className='current__tooltip'
                    >
                      {`${currentTarifPlace} GB / ${Math.round((currentTarifPlace * 8 + 2) * 80 / currency)} ${currencySymb}`}
                    </div>
                  </div>
                  <div style={{ width: startPosition * coefficient + '%' }} className='progress' />
                  <div
                    style={
                                        taskenplace != 0
                                          ? { width: (taskenplace / 1024) * coefficient + '%' }
                                          : { display: 'none' }
}
                    className='progress__taken'
                  />
                </div>
              </div>

              <div className='tarif__block-toggle'>
                {
                                    range < (taskenplace / 1024)
                                      ? <p>Для того чтобы выбрать тариф, очистите {taskenplace} {taskenplace > 1024 ? 'ГБ' : 'MB'} во вкладках <span>“сделки” </span> или <span>“клиенты”</span>
                                        </p>
                                      : range == 11
                                        ? <p>Стоимость безлимитного тарифа по запросу, отправьте заявку и менеджер вам перезвонит</p>
                                        : <p>После оплаты тарифа вам сразу начисляется купленный объём памяти. Срок действия тарифа - 1 календарный месяц. Возврат средств не предусмотрен.</p>

                                }
              </div>
              {
                                isMaxOfSliderRange
                                  ? <BlueBtn func={openHelpModalToCallUs}>Связаться с нами</BlueBtn>
                                  : <button
                                      className={bb.btn}
                                      onClick={openPayModal(priceGB, GB)}
                                      style={
                                            range == 0
                                              ? {
                                                  backgroundColor: '#F2F2F2',
                                                  color: '#C1C5D6'
                                                }
                                              : null
                                        }
                                      disabled={range == 0}
                                    >
                                    Оплатить
                                  </button>
                            }
            </div>
          </div>
        </div>
      </div>
      <HelpModal />
    </div>
  )
}

export default Tarif
