import React, { useEffect, useRef, useState, useContext, useCallback } from 'react'
import BlueBtn from 'ui/btns/BlueBtn'
import 'scss/clients.scss'
import { activeItem, arrowdwn, arrowLeft, arrowRight, bird, dis, pencil, settings, urn } from 'img'
import TopLine from 'componentStore/TopLine'
import tl from 'componentStore/moduleScss/topline.module.scss'
import RemoveClients from 'componentStore/modals/RemoveClients'
import ColumnSettings from 'componentStore/modals/ColumnSettings'
import ExportColumn from 'componentStore/modals/ExportColumn'
import ImportColumn from 'componentStore/modals/ImportColumn'
import { checkClient, createClient, flagClient, getAllClients, getClients, getCompany, updateClient } from 'redux/asyncRedux/ClientsAsync'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, Route } from 'react-router-dom'
import ClientService from 'requests/service/ClientService'
import { _getCartId, _getCurrentCart } from 'redux/redusers/CartReduser'
import { _clearClients, _getClients, _getClientsCarts, _getCurrentClient, _setClients, _setClientsPage, _setColumns } from 'redux/redusers/ClientReduser'

import { ContentStatesStore } from 'StoreStates'
import { useIMask } from 'react-imask'
import { logOut } from 'redux/asyncRedux/UserAuthAsync'
import ErrorAlert from 'ui/alerts/ErrorAlert'
import { _getCompanySpace, _getCompanyTakenSpace } from 'redux/redusers/CompanyReduser'
import { formatDateAndMonth } from 'functions/FormatDate'
import Loading from 'ui/loading/Loading'
import { Navigate, useNavigate } from 'react-router'
import LoadAlert from 'ui/alerts/LoadAlert'

function Clients() {
  // #region INITIALS STATES OF COMPONENT
  const { setIsLoading } = useContext(ContentStatesStore)
  
  const refClients = useRef(null)
  
  const backKey = (e) => {
    e.preventDefault()
    const loc = window.location.href
    document.location.replace(`${loc}clients`)
    console.log(document.location.href)
  } 
  const focus = (elem) => {
    elem.focus()
  }
  useEffect(() => {
    window.addEventListener('popstate', backKey)
    return () => window.removeEventListener('popstate',backKey)
  },[])
  const clientsAll = useSelector(state => state.client.allClients)
  const [activeModal, setActiveModal] = useState(false)
  const [activeColumnSettings, setActiveColumnSettings] = useState(false)
  const [activeImportColumn, setactiveImportColumn] = useState(false)
  const [activeExportColumn, setactiveExportColumn] = useState(false)
  const [userAdded, setUserAdded] = useState(false)
  const [reWriteedRowID, setReWriteedRowID] = useState('')

  const [limit, setLimit] = useState(20)

  const [seacrch, setSeacrch] = useState('')

  const [clientsLoading, setClientsLoading] = useState(false)

  const [dataColumns, setDataColumns] = useState([
    { id: 1, title: 'Ф.И.О', order: 1, value: 'name' },
    { id: 2, title: 'Организация', order: 2, value: 'org' },
    { id: 3, title: 'ИНН', order: 3, value: 'iin' },
    { id: 4, title: 'Телефон', order: 4, value: 'tel' },
    { id: 5, title: 'E-mail', order: 5, value: 'email' }
  ])

  const [valuesOfInputs, setValuesOfInputs] = useState({
    name: '',
    org: '',
    iin: '',
    tel: '',
    email: ''
  })

  // #endregion

  // #region INITIALS FUNCTION AND REDUX OF COMPONENT

  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)
  const { clients, clientsLength, columns, pageList } = useSelector(state => state.client)
  const { carts } = useSelector(state => state.newCart)
  const { space, takenSpace, paymentDate } = useSelector(state => state.companySpace)
  const fields = useSelector(state => state.companySpace.fields)
  
  const [arrayOfClients, setArrayOfClients] = useState([])


  const [numberOfClients, setNumber] = useState(1) 

  const [rowId, SetrowId] = useState('')
  const tableRef = useRef()
  const [curretSelectTitle, setCurretSelectTitle] = useState('Вся база')
  const clientsListRef = useRef()
  const [blobWeigth, setBlob] = useState(0)
  const [success, setSuccess] = useState([])
  const [refusual, setRefusual] = useState([])
  const [notDeal, setDeal] = useState([])
  
  const [telMask, setTelMask] = useState({ mask: '+{7} (000) 000 00 00' })
  const { ref, setRef } = useIMask(telMask)

  const [inputError, setInputError] = useState(false)
  const [activeErrorAlert, setActiveErrorAlert] = useState(false)
  const [alertErrorText, setAlertErrorText] = useState('')
  const [activeLoadAlert, setActiveLoadAlert] = useState(false)
  
  const [fieldsState,setFields] = useState([])
  const body = document.getElementsByTagName('body')[0]
  useEffect(() => {
    if(fields){
      setFields(fields?.split('|'))
    }
  },[fields])

  const removeclient = (id) => {
    setActiveModal(true)
    SetrowId(id)
  }

  const closeClientModal = () => {
    setActiveModal(false)
    setReWriteedRowID(null)
  }

  const columnSettings = () => {
    setActiveColumnSettings(true)
  }
  const closeColumnSettings = () => {
    setActiveColumnSettings(false)
  }

  const imporColumn = () => {
    setactiveImportColumn(true)
    body.style.overflow = 'hidden'
  }
  const closeImporColumn = () => {
    setactiveImportColumn(false)
    body.style.overflow = 'auto'
  }

  const exportcolumn = async () => {
    await getImportClients()
    setactiveExportColumn(true)
    document.getElementsByTagName('body')[0].style.overflowY = 'hidden'
    const dataType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    const tableSelect = tableRef.current
    const tableHTML = tableSelect.outerHTML.replace(/ /g, '%20')
 
    const filename = '11111111111111' + '.xls'
    const blob = new Blob(['\ufeff', tableHTML], {
      type: dataType
    })
    setBlob(blob.size/1024)
  }
  const closeExportcolumn = () => {
    setactiveExportColumn(false)
    document.getElementsByTagName('body')[0].style.overflowY = 'auto'
  }

  const removeClientsFunc = {
    activeModal, closeClientModal, rowId
  }

  let keys = null
  let values = null
  function createAnotherClient(val) {
    return async () => {
      if (valuesOfInputs.org.length != 0) {
        const data = JSON.parse(localStorage.getItem('columns'))
        const result = {
          ...data,
          userId: user.id
        }

        createClient(dispatch, result)
        setUserAdded(false)
        setInputError(false)

        keys = Object.keys(valuesOfInputs)
        values = { ...valuesOfInputs }

        keys.forEach(item => {
          values[item] = ''
        })
        setValuesOfInputs(values)
        return
      }
      setInputError(true)
    }
  }

  const cancelAddingUser = () => {
    setUserAdded(false)

    keys = Object.keys(valuesOfInputs)
    values = { ...valuesOfInputs }

    keys.forEach(item => {
      values[item] = ''
    })
    setValuesOfInputs(values)
  }

  // #endregion

  useEffect(() => {
    const fetchData = async () => {
      dispatch(_clearClients())
      dispatch(_setClientsPage(2))
      try {
        if (localStorage.getItem('token')) {
          setClientsLoading(true)
          const { success, refusual, notDeal } = await getClients(dispatch, user.id, limit, numberOfClients)
          setNumber(it => it + 1)
          setSuccess(success)
          setRefusual(refusual)
          setDeal(notDeal)
          setClientsLoading(false)

          return
        }
        logOut(dispatch)
      } catch (error) {
        setClientsLoading(false)
        console.log('clients error', error)
      }
    }
    fetchData()
  }, [])

  const getImportClients = async () => {
    await getAllClients(dispatch, user.id)
  }
  const getNewClients = async() => {
    console.log(11111)
    const { success, refusual, notDeal } = await getClients(dispatch, user.id, limit, numberOfClients)
    setNumber(it => it + 1)
    setSuccess(it => [it,success])
    setRefusual(it => [it, refusual])
    setDeal(it => [it, notDeal])
  }
  useEffect(() => {
    setArrayOfClients(clients)
  }, [clients])

  function sortColumns(first, second) {
    if (first.order > second.order) {
      return 1
    }
    return -1
  }
  
  function exportTableToExcel() {
    /*const filename2 = 'clients'

    let downloadLink
    const dataType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
    const tableSelect = tableRef.current
    const tableHTML = tableSelect.outerHTML.replace(/ /g, '%20')

    const filename = filename2 ? filename2 + '.xlsx' : 'excel_data.xls'

    downloadLink = document.createElement('a')
    if (navigator.msSaveOrOpenBlob) {
      const blob = new Blob(['\ufeff', tableHTML], {
        type: dataType
      })
      setBlob(blob.size / 1024)
      navigator.msSaveOrOpenBlob(blob, filename)
    } else {
      const blob = new Blob(['\ufeff', tableHTML], {
        type: dataType
      })
      setBlob(blob.size/1024)
      //downloadLink.href = 'data:' + dataType + ', ' + tableHTML

      downloadLink.download = filename

      downloadLink.click()
    }*/
    closeExportcolumn()
  }

  const emailRegx = /^(([0-9A-Za-z^<>()[\]|\.:;_]{1,2}[0-9A-Za-z\.]{1,}[0-9A-Za-z]{1})@([A-Za-z]{1,}\.){1,2}[A-Za-z]{2,5})$/
  const telRegx = /^(\+[1-9]{1,2} \([0-9]{3}\) [0-9]{3}( [0-9]{2}){2})$/

  function inputChangeHandler(e) {
    setValuesOfInputs({
      ...valuesOfInputs,
      [e.target.dataset.type]: e.target.dataset.type == 'tel' ? onlyNumber(e.target.value) : e.target.value
    })

    if (e.target.dataset.type == 'email') {
      if (!emailRegx.test(String(e.target.value.toLowerCase())) && e.target.value != 0) {
        e.target.classList.add('inputError')
        return
      }
      e.target.classList.remove('inputError')
    }
  }

  function onlyNumber(str) {
    str = str.trim().replace(/[^\d\.]+/gi, '')
    const s = str.indexOf('.', str.indexOf('.'))
    if (!s) { str = str.substr(0, s - 1) }
    return str
  }

  function openDropDown({ target }) {
    clientsListRef.current.classList.toggle('open')
    const { type, id } = target.dataset
    if (type == 'selectedItem') {
      selectItem(target.dataset)
    }
  }
  function selectItem({ type, id }) {
    if (!clientsListRef.current.querySelector(`[data-id="${id}"]`).classList.contains('selected')) {
      clientsListRef.current.querySelectorAll('[data-type="selectedItem"]')
        .forEach(item => { item.classList.remove('selected') })

      clientsListRef.current.querySelector(`[data-id="${id}"]`).classList.add('selected')

      if (id == 1) {
        setCurretSelectTitle('Вся база')
        setArrayOfClients(clients)
      }
      if (id == 2) {
        setArrayOfClients(
          clients.filter(c => carts.find(card => card.clientId == c._id))
        )
        setCurretSelectTitle('Активная база')
        return
      }
      if (id == 3) {
        setArrayOfClients(
          clients.filter(x => success?.find(y => y.clientId == x._id))
        )
        setCurretSelectTitle('Успешные')
        return
      }
      if (id == 4) {
        setArrayOfClients(
          clients.filter(x => refusual?.find(y => y.clientId == x._id))
        )
        setCurretSelectTitle('Отказ')
      }
      if (id == 5) {
        setArrayOfClients(
          clients.filter(x => notDeal?.find(y => y._id == x._id))
        )
        setCurretSelectTitle('Без сделок')
      }
    }
  }

  function clickOnClient(id, clname, clorg, cltel, clemail) {
    return async () => {
      try {
        setIsLoading(true)
        localStorage.setItem('currentClientId', JSON.stringify(id))
        const client = await ClientService.checkClient(id, clname, clorg, cltel, clemail, user.id)
          .then(data => data.data)

        if (client.hasCards) {
          dispatch(_getClientsCarts(client.currentCards))
          dispatch({ type: 'SET_ISCLIENTHASHCARDS', payload: true })
          return
        }
        localStorage.setItem('linkCardId', client.cardId)
        dispatch(_getCurrentCart(client.card))
        localStorage.setItem('cartId', JSON.stringify(client.cardId))
        dispatch({ type: 'SET_ISCLIENTHASHCARDS', payload: false })
      } catch (error) {
        console.log('error', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  async function selectCurrentRow(id) {
    // const client = await ClientService.getCurrent(id).then(data => data.data)
    const client = clients.find(cl => cl._id == id)
    const keys = Object.keys(valuesOfInputs)
    const data = { ...valuesOfInputs }

    keys.forEach(item => {
      data[item] = client[item]
    })
    setValuesOfInputs({...data})
    localStorage.setItem('columns', JSON.stringify(data))
    setReWriteedRowID(id)
  }

  async function update(id) {
    const data = JSON.parse(localStorage.getItem('columns'))
    const result = {
      id: id,
      ...data,
      userId: user.id
    }
    await updateClient(dispatch, result)
    setReWriteedRowID(null)
  }

  function setDataToLocalStorage(data) {
    return () => {
      localStorage.setItem('columns', JSON.stringify(data))
    }
  }

  async function importFile(file) {
    setActiveLoadAlert(true)
    const { clients, result, space, takenSpace } = await ClientService.uploadClientFromFile(file, user.id).then(data => data.data)
    console.log(result)
    if (result != 3 && result) {
      setActiveLoadAlert(false)
      setActiveErrorAlert(false)
      setAlertErrorText('')
      dispatch(_setClients(clients))
      dispatch(_getCompanySpace(space))
      dispatch(_getCompanyTakenSpace(takenSpace))
      setNumber(1)
      window.location.reload()
      return
    }
    setActiveLoadAlert(false)
    if(result === 3){
      setActiveErrorAlert(true)
      setAlertErrorText('В файле больше 10000 строк!')
      return
    }
    setActiveErrorAlert(true)
    setAlertErrorText('Не удалось загрузить файл')
  }
  const [load, setLoad] = useState(true)
  async function scrollHandler(e) {
    if ( e.target.scrollHeight - e.target.scrollTop < 500){
      if(load){
        setLoad(false)
        await getNewClients()
        setTimeout(() => {
          setLoad(true)
        },2000)
      }
    }
  }

  useEffect(() => {
    if (user?.id) {
      getCompany(dispatch, user.id)
    }
  }, [user])

  useCallback(() => {
    function setPage(page) {
      return page + 1
    }
  }, [])
  const clickNewClient = (id) => {
    flagClient(dispatch, id)
  }
  

  return (
    <div ref = {refClients} className='clients'>
      {
        clientsLoading
          ? <Loading />
          : <div className='container'>
            <div className='clients__inner'>
              <TopLine title='Клиенты'>
                <div className={tl.firstseacrch}>
                  <span>занято {takenSpace >= 1
                    ? takenSpace  
                    : Math.floor(takenSpace * 1024)} {takenSpace >= 1 ? 'GB' : 'MB'} / {space}GB до {formatDateAndMonth(paymentDate)}
                  </span>
                  <input
                    value={seacrch}
                    onChange={e => setSeacrch(e.target.value)}
                    className='inp'
                    type='search'
                    name=''
                    id=''
                    placeholder='Поиск'
                    max={20}
                  />
                </div>

                <button className='add_new_client_btn' onClick={() => setUserAdded(prev => !prev)}>Добавить клиента</button>
              </TopLine>

              <div className='clients__content'>
                <LoadAlert
                  errorText={alertErrorText}
                  active={activeLoadAlert}
                  setActive={setActiveLoadAlert}
                   />
                <ErrorAlert
                  errorText={alertErrorText}
                  active={activeErrorAlert}
                  setActive={setActiveErrorAlert}
                  importFile={importFile}
                />

                <div className='clients__content-top'>
                  <div
                    onClick={e => openDropDown(e)}
                    ref={clientsListRef}
                    data-type='selectedStatus'
                    className='clients__select'
                  >
                    <div
                      className='clients__select-input'
                      data-type='selectedStatus'
                    >
                      <div className='clients__select-input-wrap'>
                        <span>{curretSelectTitle}</span>
                        <img src={arrowdwn} alt='' />
                      </div>
                    </div>
                    <div className='clients__select-dropDown'>
                      <ul>
                        <li
                          className='clients__select-item selectedItem selected'
                          data-id={1}
                          data-type='selectedItem'
                        >
                          <img className='customSelectedItemImg' src={activeItem} alt='' />
                          <span>
                            Вся база
                          </span>
                        </li>
                        <li
                          className='clients__select-item selectedItem'
                          data-id={2}
                          data-type='selectedItem'
                        >
                          <img className='customSelectedItemImg' src={activeItem} alt='' />
                          <span>
                            Активная база
                          </span>
                        </li>
                        <li
                          className='clients__select-item selectedItem'
                          data-id={3}
                          data-type='selectedItem'
                        >
                          <img className='customSelectedItemImg' src={activeItem} alt='' />
                          <span>
                            Успешные
                          </span>
                        </li>
                        <li
                          className='clients__select-item selectedItem'
                          data-id={4}
                          data-type='selectedItem'
                        >
                          <img className='customSelectedItemImg' src={activeItem} alt='' />
                          <span>
                            Отказы
                          </span>
                        </li>
                        <li
                          className='clients__select-item selectedItem'
                          data-id={5}
                          data-type='selectedItem'
                        >
                          <img className='customSelectedItemImg' src={activeItem} alt='' />
                          <span>
                            Без сделок
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {
                    user?.role == 'admin'
                      ? <div className='clients__content-topBtns'>
                        <button onClick={imporColumn}>Импорт</button>
                        <button onClick={exportcolumn}>Экспорт</button>
                      </div>
                      : null
                  }
                </div>

                <div onScroll={scrollHandler} className='clients__content-table'>
                  <div className='clients__content-table-items'>
                    <ul className='clients__content-items'>
                      <li className='clients__content-item header_clients_item'>
                        <div className='fields__content-item'>
                          <span>№</span>
                          {
                            fieldsState?.map((item,ind) =>
                              <span key={`${ind}_item_field`}>
                                {item}
                              </span>
                            )
                          }
                        </div>
                        <span>
                          <img
                            style={{ cursor: 'pointer' }}
                            onClick={columnSettings}
                            src={settings}
                            alt=''
                          />
                        </span>
                      </li>
                      <li
                        className='clients__content-item add'
                        style={userAdded ? { display: 'flex' } : null}
                      >
                        <span>1</span>
                        {
                          dataColumns?.map((item, idx) =>
                            <input
                              ref={item.value == 'tel' ? ref : null}
                              key={item.id}
                              name='name'
                              value={valuesOfInputs[item.value]}
                              data-type={item.value}
                              onChange={e => inputChangeHandler(e)}
                              onBlur={setDataToLocalStorage(valuesOfInputs)}
                              onMouseLeave={setDataToLocalStorage(valuesOfInputs)}
                              className={`active ${item.value == 'org'
                                ? inputError
                                  ? 'inputError'
                                  : null
                                : null}`}
                              type={`${item.value == 'tel'
                                ? 'tel'
                                : item.value == 'email'
                                  ? 'email'
                                  : 'text'}`}
                              maxLength={`${item.value == 'tel' ? 18 : 45}`}
                              data-id='1'
                              autoComplete='off'
                              style={userAdded ? { pointerEvents: 'auto' } : null}
                            />
                          )
                        }
                        <div className='clients__content-item-btns'>
                          <button
                            onClick={createAnotherClient()}
                          >
                            <img src={bird} alt='' />
                          </button>
                          <button onClick={() => cancelAddingUser()}>
                            <img src={urn} alt='' />
                          </button>
                        </div>
                      </li>
                      {
                        arrayOfClients
                          .filter(clt => clt.name?.toLowerCase().includes(seacrch.toLowerCase()))
                          .map((client, indx) => {

                            return (
                              client._id != reWriteedRowID
                                ? <li
                                  onClick={client.flag === 0 ? () => clickNewClient(client._id) : null}
                                  key={client._id}
                                  className='clients__content-item client'
                                  style={userAdded ? { pointerEvents: 'none' } : null}
                                >
                                  <Link
                                    to={`/client/${client._id}`}
                                    onClick={clickOnClient(client._id, client.name, client.org, client.tel, client.email)}
                                  >
                                    <span>
                                      {(indx + 1)}
                                    </span>
                                    {
                                      dataColumns?.map(item =>
                                        <input
                                          key={item.id}
                                          style={userAdded ? { color: '#C1C5D6' } : null}
                                          type='text'
                                          value={client[item.value]}
                                          data-id='1'
                                          data-value='01'
                                          onChange={e => { }}

                                        />
                                      )
                                    }
                                  </Link>
                                  <span>
                                    <button
                                      onClick={() => selectCurrentRow(client._id)}
                                    >
                                      <img src={pencil} alt='' />
                                    </button>
                                  </span>
                                </li>

                                : <li
                                  key={client._id}
                                  className='clients__content-item active'
                                  style={userAdded ? { pointerEvents: 'none' } : null}
                                >
                                  <div className='active__client_div'>
                                  <span>
                                    {(indx + 1)}
                                  </span>
                                  {
                                    dataColumns?.map((item) =>
                                      <input
                                        key={item.id}
                                        style={userAdded ? { color: '#C1C5D6' } : null}
                                        type='text'
                                        value={valuesOfInputs[item.value]}
                                        onChange={e => inputChangeHandler(e)}
                                        data-type={item.value}
                                        onBlur={setDataToLocalStorage(valuesOfInputs)}
                                        onMouseLeave={setDataToLocalStorage(valuesOfInputs)}
                                        maxLength={item.value == 'tel' ? 18 : 45}
                                        data-id='1' data-value='01'
                                      />
                                    )
                                  }
                                  </div>
                                  <div className='clients__content-item-btns'>
                                    <button
                                      onClick={() => update(client._id)}
                                    >
                                      <img src={bird} alt='' />
                                    </button>
                                    <button
                                      onClick={() => removeclient(client._id)}
                                    >
                                      <img src={urn} alt='' />
                                    </button>
                                  </div>
                                </li>)
                          }
                          )
                      }
                    </ul>
                  </div>
                </div>
              </div>

              <table  ref={tableRef} id = 'export_table_exel'className = 'table_export'>
                <thead>
                  <tr>
                    <td>№</td>
                    <td>{fieldsState[0]}</td>
                    <td>{fieldsState[1]}</td>
                    <td>{fieldsState[2]}</td>
                    <td>{fieldsState[3]}</td>
                    <td>{fieldsState[4]}</td>
                  </tr>
                </thead>
                <tbody>
                  {
                    clientsAll && clientsAll.map(
                      (item, index) =>
                        <tr key={item._id}>
                          <td>
                            {(index + 1) <= 9
                              ? '00' + (index + 1)
                              : (index + 1) <= 100
                                ? '0' + (index + 1)
                                : (index + 1)}
                          </td>
                          <td>{item.name}</td>
                          <td>{item.org}</td>
                          <td>{item.iin}</td>
                          <td>{item.tel}</td>
                          <td>{item.email}</td>
                        </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>
      }

      <RemoveClients {...removeClientsFunc} />
      { fieldsState.length != 0 && <ColumnSettings
        active={activeColumnSettings}
        setActive={setActiveColumnSettings}
        focus = {focus}
        func={closeColumnSettings}
        dataColumns={fieldsState}
        setColumns={setFields}
        valuesOfInputs={valuesOfInputs}
        setValuesOfInputs={setValuesOfInputs}
        userId={user?.id}
      />}

      <ExportColumn
        active={activeImportColumn}
        func={closeImporColumn}
        setActiveErrorAlert={setActiveErrorAlert}
        setErrorText={setAlertErrorText}
        importFile={importFile}
      />
      <ImportColumn
        size ={blobWeigth}
        dataColumns = {fieldsState}
        rows={tableRef.current ? tableRef.current.rows.length : "Нет данных"}
        active={activeExportColumn}
        func={closeExportcolumn}
        exportFunc={exportTableToExcel}
        clients={clientsAll ? clientsAll : []}
      />
    </div>
  )
}

export default Clients
