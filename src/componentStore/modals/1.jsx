import { close, mastercard, money, qiwi, quest, visa, webmoney } from 'img'
import React, { Fragment, useEffect, useState } from 'react'
import 'scss/commonStyleOfModal.scss'
import BlueBtn from 'ui/btns/BlueBtn'
import GrayBtn from 'ui/btns/GrayBtn'
import 'componentStore/moduleScss/paymodal.scss'
import axios from 'axios'
import { useSelector } from 'react-redux'
import bcrypt from 'bcryptjs'

function PayModal ({ active, setActive }) {
  const [showAnotherPayMethod, setShowAnotherPayMethod] = useState(false)

  const { user } = useSelector(state => state.user)

  const [sha256, setSha256] = useState('')
  
  function closeModal () {
    setActive(false)
  }

  function showAnotherPayMethodHandler () {
    setShowAnotherPayMethod(!showAnotherPayMethod)
  }

  function pay () {
    // axios.post(`https://unitpay.ru/api?
    // method=initPayment
    // params[paymentType]=card
    // params[account]=${user.email}
    // params[sum]=10.00
    // params[projectId]=436793
    // params[resultUrl]=http://www.boostcrm.ru
    // params[ip]=77.129.27.24
    // params[secretKey]=63ef7c55f61e800dff31b3b32b5d5c88
    // params[preauth]=0
    // params[customerEmail]=${user.email}`
    // )
  }

  useEffect(() => {
    // setSing(getFormSignature('wq2','RUB','test','1','90fbf17a9e98990c37fe18fcfa0bc0c9'))
    getFormSignature(user.email, 'RUB', 'test', 1, '90fbf17a9e98990c37fe18fcfa0bc0c9')
    // console.log(`object`, sing)
  }, [])

  async function getFormSignature (account, currency, desc, sum, secretKey) {
    const hashStr = `${account}.up.${currency}.up.${desc}.up.${sum}.up.${secretKey}`

    const msgBuffer = new TextEncoder().encode(hashStr)

    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))

    console.log('hashArray', hashArray)

    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    // const _sha256 = bcrypt.hashSync(hashStr)
    // const _sha256 = window.btoa(encodeURIComponent(escape(hashStr)))
    // setSha256(unescape(decodeURIComponent(window.atob(_sha256))))
    setSha256(hashHex)
    // console.log(`sha256`, _sha256)
  }
  async function sha256Hash (row) {
    const msgBuffer = new TextEncoder().encode(row)

    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
    console.log('hashBuffer', hashBuffer)

    const hashArray = Array.from(new Uint8Array(hashBuffer))
    console.log('hashArray', hashArray)

    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    console.log('hashHex', hashHex)
    // return hashHex;
  }
  console.log('sha256', sha256)

  // console.log(`sing`, sing)
  // function payF() {
  //     var payment = new UnitPay();
  //     payment.createWidget({
  //         publicKey: "436787-a35c5",
  //         sum: 1,
  //         account: `${user.email}`,
  //         domainName: "unitpay.ru",
  //         signature: "a4e0dc2694c3010ce167b7393c0efabdf15edce7810e4564e48bde767aebcc22",
  //         desc: "Описание платежа",
  //         locale: "ru",
  //     });
  //     payment.success(function (params) {
  //         console.log('Успешный платеж');
  //     });
  //     payment.error(function (message, params) {
  //         console.log(message);
  //     });
  //     return false;
  // };

  return (
    <div
      className='modalWrapper'
      style={active ? { display: 'block' } : null}
    >
      <div className='modalParandja'>
        <div className='modal'>
          <div className='modalTopLine mb_24'>
            <h1 className='paymodal__title'>Способ оплаты</h1>
            <img onClick={closeModal} src={close} alt='' className='modalTopLine__close' />
          </div>
          <div className='paymodal__wayOFpay'>
            <button
              onClick={showAnotherPayMethodHandler}
              className={showAnotherPayMethod ? '' : 'active'}
            >Картой / E-кошелек
            </button>
            <button
              onClick={showAnotherPayMethodHandler}
              className={showAnotherPayMethod ? 'active' : ''}
            >Банковский перевод для юр. лиц
            </button>
          </div>
          {
                        showAnotherPayMethod
                          ? <div>
                            <label className='modal__Label' htmlFor=''>Название компании</label>
                            <input className='modal__Input' type='text' />

                            <label className='modal__Label' htmlFor=''>Юридический адрес</label>
                            <input className='modal__Input' type='text' />

                            <label className='modal__Label' htmlFor=''>ИНН/ЕГРПОУ/УНП/БИН</label>
                            <input className='modal__Input' type='text' />

                            <label className='modal__Label' htmlFor=''>КПП</label>
                            <input className='modal__Input' type='text' />

                            <label className='modal__Label' htmlFor=''>Рабочий телефон</label>
                            <input className='modal__Input' type='text' />

                            <label className='modal__Label' htmlFor=''>Адрес для корреспонденции</label>
                            <textarea className='modal__TextArea' name='' id='' />

                            <div className='paymodal__result'>
                              <h2 className='paymodal__result-title '>Итого</h2>
                              <div className='paymodal__result-info'>
                                <div className='paymodal__result-info-topline'>
                                  <span>Количество места </span>
                                  <span>750 ГБ</span>
                                </div>
                                <div className='paymodal__result-info-secondlien'>
                                  <span>Стоимость</span>
                                  <span>9 990 ₽</span>
                                </div>
                                <span
                                  className='paymodal__result-info-remind'
                                >При оплате вы принимаете <span> Лицензионное соглашение</span>
                                </span>
                              </div>
                              <div className='modal__Btns'>
                                <GrayBtn func={closeModal}>Отменить</GrayBtn>
                                <BlueBtn onClick = {() => console.log(1111)}>
                                  {/* <a href={ `https://unitpay.ru/pay/436787-a35c5?sum=1&account=${user.email}&
                                            desc=test&signature=${sing}`
                                            }
                                            >Оплатить</a> */}

                                  {/* <a href={ `https://unitpay.ru/api?
                                                method=initPayment
                                                params[paymentType]=paypal
                                                params[account]=${user.email}
                                                params[sum]=1.00
                                                params[projectId]=436787
                                                params[resultUrl]=http://www.boostcrm.ru
                                                params[secretKey]=90fbf17a9e98990c37fe18fcfa0bc0c9
                                                params[signature]=${sing}
                                                params[preauth]=1
                                                params[customerEmail]=${user.email}`}>Оплатить</a> */}
                                  <a  href='https://unitpay.ru/api?method=initPaymentparams[paymentType]=yandexparams[account]=order413params[sum]=1.00params[projectId]=1params[resultUrl]=http://вашсайт.ruparams[ip]=77.129.27.24params[secretKey]=90fbf17a9e98990c37fe18fcfa0bc0c9params[signature]=cf80143faa44f2ee87ba0809170ba7406f9760641f82e6fc27e0889f2b1d320d'>Оплатить
                                  </a>
                                </BlueBtn>

                              </div>
                            </div>
                            </div>
                          : <>

                            <ul className='paymodal__paymentSystem'>
                              <li>
                                <img src={visa} alt='' />
                              </li>
                              <li>
                                <img src={mastercard} alt='' />
                              </li>
                              <li>
                                <img src={money} alt='' />
                              </li>
                              <li>
                                <img src={webmoney} alt='' />
                              </li>
                              <li>
                                <img src={qiwi} alt='' />
                              </li>
                            </ul>

                            <div className='paymodal__result'>
                              <h2 className='paymodal__result-title '>Итого</h2>
                              <div className='paymodal__result-info'>
                                <div className='paymodal__result-info-topline'>
                                  <span>Количество места </span>
                                  <span>750 ГБ</span>
                                </div>
                                <div className='paymodal__result-info-secondlien'>
                                  <span>Стоимость</span>
                                  <span>9 990 ₽</span>
                                </div>
                                <span className='paymodal__result-info-remind'>Чек будет отправлен на вашу электронную почту</span>
                                <div className='paymodal__result-checkbox'>
                                  {/* <label>
                                                <input type="checkbox" name="" id="" />
                                                <span>Автопродление оплаты</span>
                                            </label>
                                            <img src={ quest } alt="" /> */}
                                  <img src={quest} alt='' />
                                </div>
                              </div>
                              <div className='modal__Btns'>
                                <GrayBtn func={closeModal}>Отменить</GrayBtn>
                                <BlueBtn func={pay}>Оплатить</BlueBtn>
                              </div>
                            </div>
                          </>
                    }
        </div>
      </div>
    </div>
  )
}

export default PayModal
