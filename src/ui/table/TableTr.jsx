import { bird, pencil, urn } from 'img'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import { updateClient } from 'redux/asyncRedux/ClientsAsync'
import { _getClientsCarts } from 'redux/redusers/ClientReduser'
import ClientService from 'requests/service/ClientService'
import { ContentStatesStore } from 'StoreStates'

function TableTr ({ userAdded, num, changeActiveHandler, removeclient, seacrch, columns, clients }) {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)
  const { carts } = useSelector(state => state.newCart)

  const { isLoading, setIsLoading } = useContext(ContentStatesStore)

  const [hasClientCards, setHasClientCards] = useState(false)

  const [reWriteedRowID, setReWriteedRowID] = useState('')

  const [fio, setFio] = useState('')
  const [org, setOrg] = useState('')
  const [iin, setIin] = useState('')
  const [tel, setTel] = useState('')
  const [email, setEmail] = useState('')

  async function selectCurrentRow (id) {
    const client = await ClientService.getCurrent(id).then(data => data.data)
    setFio(client?.name ? client.name : '')
    setOrg(client?.org ? client.org : '')
    setIin(client?.iin ? client.iin : '')
    setTel(client?.tel ? client.tel : '')
    setEmail(client?.email ? client.email : '')
    setReWriteedRowID(id)
  }

  async function update (id) {
    await updateClient(dispatch, id, fio, org, iin, tel, email, user.id)
    setReWriteedRowID(null)
  }

  function cancel (id) {
    removeclient(id)
    setReWriteedRowID(null)
    setFio('')
    setOrg('')
    setIin('')
    setTel('')
    setEmail('')
  }

  async function clickOnClient (id, clname, clorg, cltel, clemail) {
    try {
      setIsLoading(true)
      localStorage.setItem('currentClientId', JSON.stringify(id))
      const isCart = await ClientService.checkClient(id, clname, clorg, cltel, clemail, user.id).then(data => data.data)
      if (isCart.isHas) {
        dispatch(_getClientsCarts(isCart.currentCart))
        dispatch({ type: 'SET_ISCLIENTHASHCARDS', payload: true })
        return
      }
      localStorage.setItem('cartId', JSON.stringify(isCart.cardId))
      dispatch({ type: 'SET_ISCLIENTHASHCARDS', payload: false })
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {
                clients?.filter(clt => clt.name?.includes(seacrch.toLowerCase())).reverse().map((client, indx) =>
                  client._id != reWriteedRowID
                    ? <ul key={client._id} className='clients__content-client' style={userAdded ? { pointerEvents: 'none' } : null}>
                      <Link
                        to={`/client/${client._id}`}
                        onClick={
                                    () => clickOnClient(client._id, client.name, client.org, client.tel, client.email)
                                }
                      >
                        <li style={userAdded ? { color: '#C1C5D6' } : null}>
                          <span>{(indx + 1) <= 9 ? '00' + (indx + 1) : '0' + (indx + 1)}</span>
                        </li>
                        {
                                    columns.map(item =>
                                      <li key={item.id}>
                                        <input
                                          style={userAdded ? { color: '#C1C5D6' } : null}
                                          type='text'
                                          value={client[item.value]}
                                          onClick={e => changeActiveHandler(e)}
                                          onBlur={e => e.target.classList.remove('active')}
                                          data-id='1' data-value='01' onChange={e => []}
                                        />
                                      </li>
                                    )
                                }
                      </Link>
                      <button onClick={() => selectCurrentRow(client._id)}>
                        <img src={pencil} alt='' />
                      </button>
                      </ul>
                    : <ul
                        className='clients__content-client'
                        key={client._id}
                        style={userAdded ? { pointerEvents: 'none' } : null}
                      >
                      <li>
                        {(indx + 1) <= 9 ? '00' + (indx + 1) : '0' + (indx + 1)}
                      </li>
                      <li>
                        <input
                          className='active' style={{ pointerEvents: 'auto' }}
                          type='text' value={fio}
                          onBlur={e => e.target.classList.remove('active')} data-id='1'
                          data-value='01' onChange={e => setFio(e.target.value)}
                        />
                      </li>
                      <li>
                        <input
                          className='active'
                          style={{ pointerEvents: 'auto' }}
                          type='text'
                          value={org}
                          onBlur={e => e.target.classList.remove('active')}
                          data-id='2'
                          data-value='02'
                          onChange={e => setOrg(e.target.value)}
                        />
                      </li>
                      <li>
                        <input
                          className='active'
                          style={{ pointerEvents: 'auto' }}
                          ype='text'
                          value={iin}
                          onBlur={e => e.target.classList.remove('active')}
                          data-id='3'
                          data-value='03'
                          onChange={e => setIin(e.target.value)}
                        />
                      </li>
                      <li>
                        <input
                          className='active'
                          style={{ pointerEvents: 'auto' }}
                          type='text'
                          value={tel}
                          onBlur={e => e.target.classList.remove('active')}
                          data-id='4'
                          data-value='04'
                          onChange={e => setTel(e.target.value)}
                        />
                      </li>
                      <li>
                        <input
                          className='active'
                          style={{ pointerEvents: 'auto' }}
                          type='text'
                          value={email}
                          onBlur={e => e.target.classList.remove('active')}
                          data-id='5'
                          data-value='05'
                          onChange={e => setEmail(e.target.value)}
                        />
                      </li>
                      <div className='client__btns'>
                        <button onClick={() => update(client._id)}>
                          <img src={bird} alt='' />
                        </button>
                        <button onClick={() => cancel(client._id)}>
                          <img src={urn} alt='' />
                        </button>
                      </div>
                      </ul>
                )
            }

    </>

  )
}

export default TableTr
