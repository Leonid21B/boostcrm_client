import React, { useEffect, useRef, useState } from 'react'
import { activeItem, arrowdwn, emptyAvatar } from 'img'
import 'scss/currentClient.scss'
import { getCurrent } from 'redux/asyncRedux/ClientsAsync'
import { useDispatch, useSelector } from 'react-redux'

import { formatFyllDateAndTime } from 'functions/FormatDate'
import BlueBtn from 'ui/btns/BlueBtn'
import CurrentCart from './CurrentCart'
import { Link } from 'react-router-dom'
import CartService from 'requests/service/CartService'
import { _getCurrentCartTask } from 'redux/redusers/NewTaskReduser'
import { _getCurrentCart } from 'redux/redusers/CartReduser'

function CurrentClient () {
  const dispatch = useDispatch()
  const { currentClient, clientsCarts, isClientHasCards } = useSelector(state => state.client)
  const { workers } = useSelector(state => state.worker)
  const { user } = useSelector(state => state.user)
  const { stages } = useSelector(state => state.newStages)

  const [clientsCards, setClientsCards] = useState(clientsCarts)

  const selectResponsibleRef = useRef()
  const selectNewRef = useRef()
  const selectStatusRef = useRef()
  useEffect(() => {
    async function fetchdata () {
      if (clientsCarts.length > 0) {
        await getCurrent(dispatch, JSON.parse(localStorage.getItem('currentClientId')))
      }
    }
    fetchdata()
  }, [])

  function openModal (e) {
    const targetDataSet = e.target.dataset

    const selectInfo = targetDataSet.type == 'selectResponsible'
      ? selectResponsibleRef.current.classList.toggle('open')
      : targetDataSet.type == 'selectNew'
        ? selectNewRef.current.classList.toggle('open')
        : targetDataSet.type == 'selectStatus'
          ? selectStatusRef.current.classList.toggle('open')
          : null

    if (targetDataSet.type == 'selectedItem') {
      selectItem(targetDataSet.id, targetDataSet.type, targetDataSet.value)
    }
  }

  function selectItem (id, type, typeOfRef) {
    const typeOfSelectRef = typeOfRef == 'selectedResponsible'
      ? { ref: selectResponsibleRef.current, value: 'selectedResponsible' }
      : typeOfRef == 'selectedNew'
        ? { ref: selectNewRef.current, value: 'selectedNew' }
        : { ref: selectStatusRef.current, value: 'selectedStatus' }

    if (!typeOfSelectRef.ref.querySelector(`[data-id="${id}"]`).classList.contains('selected')) {
      typeOfSelectRef.ref.querySelectorAll(`[data-value="${typeOfSelectRef.value}"]`)
        .forEach(item => item.classList.remove('selected'))

      typeOfSelectRef.ref.querySelector(`[data-id="${id}"]`).classList.add('selected')

      if (id != 1 && typeOfRef == 'selectedResponsible') {
        console.log(clientsCarts)
        setClientsCards([...clientsCarts].filter(item => item.workers.find(w => w._id == id)))
      } else {
        setClientsCards(clientsCarts)
      }

      if (typeOfRef == 'selectedNew') {
        setClientsCards([...clientsCards].sort((a, b) => {
          if (a.updatedAt > b.updatedAt) {
            return 1
          }
          return -1
        }))
      }

      if (typeOfRef == 'selectedStatus') {
        if (id == 1) {
          setClientsCards(clientsCards)
        }

        if (id == 2) {
          setClientsCards([...clientsCards].filter(item => item.status == 'active'))
        }

        if (id == 3) {
          setClientsCards([...clientsCards].filter(item => item.status == 'success'))
        }

        if (id == 4) {
          setClientsCards([...clientsCards].filter(item => item.status == 'refusual'))
        }
      }
      typeOfSelectRef.ref.classList.toggle('open')
    }
  }

  function sortCards (a, b) {
    if (a.createdAt > b.createdAt) {
      return -1
    }
    return 1
  }

  async function createNewDeal () {
    const card = await CartService.createCart(
      'Card title', currentClient.org, currentClient.name, 0, currentClient.tel, currentClient.email, 'address', stages[0]._id, user.id, user.comandId
    )
      .then(data => data.data)

    dispatch(_getCurrentCart(card.resultCard))

    localStorage.setItem('cartId', JSON.stringify(card.resultCard._id))
    localStorage.setItem('linkCardId', card.resultCard._id)
    dispatch({ type: 'SET_ISCLIENTHASHCARDS', payload: false })
  }

  function setToLocalStorage (id) {
    return () => {
      localStorage.setItem('linkCardId', id)
    }
  }

  return (
    <div className='currentClient' style={!isClientHasCards ? { paddingLeft: 0 } : null}>
      {
                isClientHasCards
                  ? <div className='container'>
                    <div className='currentClient__topline'>
                      <Link to='/clients'>
                        <div className='currentClient__topline-left'>
                          <span>{currentClient?.name?.length == 0 ? 'Имя контакта' : currentClient.name},</span>
                          <span>{currentClient?.org?.length == 0 ? 'Название компании' : currentClient.org}</span>
                        </div>
                      </Link>
                      <div className='currentClient__topline-right'>

                        <div
                          className='currentClient__topline-selectworker'
                          ref={selectResponsibleRef}
                          data-type='selectResponsible'
                          onClick={workers != [] ? e => openModal(e):null}
                        >
                          <div className='currentClient__topline-input'>
                            <span>Любой ответственный</span>
                            <img src={arrowdwn} alt='' />
                          </div>
                          <div className='currentClient__topline-dropdown'>
                            <ul>
                              <li
                                className='selectedItem selected'
                                data-type='selectedItem'
                                data-value='selectedResponsible'
                                data-id='1'
                              >
                                <img src={activeItem} alt='' />
                                <span>
                                  Любой ответственный
                                </span>
                              </li>
                              {
                                                workers.map(item =>
                                                  <li
                                                    key={item._id}
                                                    className='selectedItem'
                                                    data-type='selectedItem'
                                                    data-value='selectedResponsible'
                                                    data-id={item._id}
                                                  >
                                                    <img src={activeItem} alt='' />
                                                    <span>
                                                      {item.fio}
                                                    </span>
                                                  </li>
                                                )
                                            }
                            </ul>
                          </div>
                        </div>

                        <div
                          className='currentClient__topline-selectnew'
                          ref={selectNewRef}
                          data-type='selectNew'
                          onClick={e => openModal(e)}
                        >
                          <div className='currentClient__topline-input'>
                            <span>Сначала новые</span>
                            <img src={arrowdwn} alt='' />
                          </div>
                          <div className='currentClient__topline-dropdown'>
                            <ul>
                              <li
                                className='selectedItem selected'
                                data-type='selectedItem'
                                data-value='selectedNew'
                                data-id='1'
                              >
                                <img src={activeItem} alt='' />
                                <span>
                                  Сначала новые
                                </span>
                              </li>
                              <li
                                className='selectedItem'
                                data-type='selectedItem'
                                data-value='selectedNew'
                                data-id='2'
                              >
                                <img src={activeItem} alt='' />
                                <span>
                                  Сначала старые
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div
                          className='currentClient__topline-status'
                          ref={selectStatusRef}
                          data-type='selectStatus'
                          onClick={e => openModal(e)}
                        >
                          <div className='currentClient__topline-input'>
                            <span>Любой статус</span>
                            <img src={arrowdwn} alt='' />
                          </div>
                          <div className='currentClient__topline-dropdown'>
                            <ul>
                              <li
                                className='selectedItem selected'
                                data-type='selectedItem'
                                data-value='selectedStatus'
                                data-id='1'
                              >
                                <img src={activeItem} alt='' />
                                <span>
                                  Любой статус
                                </span>
                              </li>
                              <li
                                className='selectedItem'
                                data-type='selectedItem'
                                data-value='selectedStatus'
                                data-id='2'
                              >
                                <img src={activeItem} alt='' />
                                <span>
                                  Активная
                                </span>
                              </li>
                              <li
                                className='selectedItem'
                                data-type='selectedItem'
                                data-value='selectedStatus'
                                data-id='3'
                              >
                                <img src={activeItem} alt='' />
                                <span>
                                  Успешная
                                </span>
                              </li>
                              <li
                                className='selectedItem'
                                data-type='selectedItem'
                                data-value='selectedStatus'
                                data-id='4'
                              >
                                <img src={activeItem} alt='' />
                                Отказ
                              </li>
                            </ul>
                          </div>
                        </div>

                        <BlueBtn func={createNewDeal}>Создать сделку</BlueBtn>
                      </div>
                    </div>
                    <div className='currentClient__content'>
                      <ul className='currentClient__content-items'>
                        <li className='currentClient__content-item'>
                          <span>Статус</span>
                          <span>Название сделки</span>
                          <span>Ответственный</span>
                          <span>Сумма</span>
                          <span>Последнее изменение</span>
                        </li>
                        {
                                    clientsCards?.map(clientCart =>
                                      <Link
                                        key={clientCart._id}
                                        to={`/card/${clientCart._id}`}
                                        onClick={setToLocalStorage(clientCart._id)}
                                      >
                                        <li
                                          key={clientCart._id}
                                          className='currentClient__content-item'
                                        >
                                          <span
                                            className={
                                                            clientCart.status == 'active'
                                                              ? 'blue'
                                                              : clientCart.status == 'success'
                                                                ? 'green'
                                                                : 'red'
                                                        }
                                          >
                                            {
                                                            clientCart.status == 'active'
                                                              ? 'активная'
                                                              : clientCart.status == 'success'
                                                                ? 'успешная'
                                                                : 'отказ'
                                                        }
                                          </span>
                                          <span>{clientCart.title}</span>
                                          <span>
                                            {
                                                            clientCart.workers?.map(worker =>
                                                              <span key={worker._id}>
                                                                <img
                                                                  src={
                                                                        worker.avatar?.length > 0
                                                                          ? `${process.env.REACT_APP_STATIC_SERVER_PATH}/${worker.avatar}`
                                                                          : emptyAvatar
                                                                    } alt=''
                                                                />
                                                                <span>{worker.fio}</span>
                                                              </span>
                                                            )
                                                        }
                                          </span>
                                          <span>{clientCart.price ? clientCart.price + ' $' : null}</span>
                                          <span>{formatFyllDateAndTime(clientCart.updatedAt)}</span>
                                        </li>
                                      </Link>
                                    )
                                }
                      </ul>
                    </div>
                    </div>
                  : <>
                    <CurrentCart isClientCreateCard />
                    </>
            }

    </div>
  )
}

export default CurrentClient
