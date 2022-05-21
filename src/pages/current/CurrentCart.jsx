import React, { Fragment, useEffect, useRef, useState } from 'react'
import 'scss/currentcart.scss'
import { emptyAvatar, greenbird, pencil } from 'img/index'
import BlueBtn from 'ui/btns/BlueBtn'
import CurrentTopLine from 'componentStore/CurrentTopLine'
import ctl from '../../componentStore/moduleScss/currentTopLine.module.scss'
import CloseTask from 'componentStore/modals/CloseTask'
import NewTask from 'componentStore/modals/NewTask'
import NewContact from 'componentStore/modals/NewContact'
import { useDispatch, useSelector } from 'react-redux'

import { closeCardTask } from 'redux/asyncRedux/CartTasks'
import { deleteCurrentCart, getcurrentCart, updateCardStatus, updateCardWorkes } from 'redux/asyncRedux/CreateCart'
import { _deleteCart, _getCurrentCart } from 'redux/redusers/CartReduser'
import { formatDateDay, formatFyllDate, formatTime, setDateSeconds } from 'functions/FormatDate'
import CartService from 'requests/service/CartService'
import CustomSingleSelect from 'ui/select/CustomSingleSelect'
import SelectWorkers from 'ui/select/SelectWorkers'
import { updateCardField } from 'redux/asyncRedux/NewFieldAsync'
import ip from 'ui/scssModule/input.module.scss'
import { useIMask } from 'react-imask'
import { _getCurrentCartTask } from 'redux/redusers/NewTaskReduser'
import { withRouter, useHistory, useParams } from 'react-router-dom'
import Loading from 'ui/loading/Loading'
import { _getInvitedWorker } from 'redux/redusers/WorkerReduser'
import { switchHeler } from './functions/swittchHelpers'
import CardHistoryBlock from './card/CardHistoryBlock'
import BottomTasksView from './card/BottomTasksView'
import InputStatement from './card/InputStatement'
import { onlyNumber } from 'components/card/functions/createNewCardHandlers'
import { getCurrent } from 'redux/asyncRedux/ClientsAsync'

function CurrentCart({ isClientCreateCard = true }) {
  const [modalNewValue, setModalNewValue] = useState('')
  const [modalNameValue, setModalNameValue] = useState('')
  
  const [active, setActive] = useState(false)
  const [addNenTask, setAddNenTask] = useState(false)
  const values = [[90, '€'], [80, '$'], [1, '₽']]
  const currency = useSelector(state => state.user.user?.currency)
  const [succsessTask, setSuccsessTask] = useState(null)
  const [notSuccsessTask, setNotSuccsessTask] = useState(null)
  const [closeTask, setCloseTask] = useState(false)
  
  const [notSuccesCartCaption, setNotSuccesCartCaption] = useState('')

  const cartDispatch = useDispatch()
  const taskdispatch = useDispatch()
  const dispatch = useDispatch()

  //const params = window.location.href
  //let curId = params.split('/card/')[1]
  
  const {
    currentCart,
    carts
  } = useSelector(item => item.newCart)
  //let currentCart = carts[0]
  {/*useEffect(() => {
    currentCart = carts.find((item) => {
      if (item._id === curId) {
        return true
      }
      return false
    })
  },[carts])*/}
  
  
 
  
  const [title, setTitle] = useState('')

  const [cardsInputsStates, setCardsInputsStates] = useState({
    title: '',
    price: '',
    person: '',
    tel: '',
    company: '',
    email: '',
    address: '',
    day: ''
  })

  const { stages } = useSelector(item => item.newStages)
  const { user } = useSelector(item => item.user)
  const { workers } = useSelector(item => item.worker)

  const [tasks, setTasks] = useState([])
  const [fields, setFields] = useState([])

  const [isUpdateTask, setIsUpdateTask] = useState(false)

  const [telMask, setTelMask] = useState({ mask: '+{7} (000) 000 00 00' })
  const { ref, maskRef } = useIMask(telMask)

  const [fieldId, setFieldId] = useState('')
  const [fieldValue, setFieldValue] = useState('')

  const [task, setTask] = useState({})

  const historeBack = useHistory()

  const [activeInput, setActiveInput] = useState('')
  const [activeInputHelper] = useState('')

  const logRef = useRef()
  const tasksRef = useRef()
  const singleSelect = useRef()
  const multiSelect = useRef()

  const [selectedWorker, setSelectedWorker] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isCardWithOutTasks, setisCardWithOutTasks] = useState(false)

  // const [personInfoInputs, setPersonInfoInputs] = useState([
  //     {
  //         id: 1, label: 'Ф.И.О', type: 'text',
  //         name: 'fio', value: cardsInputsStates['person'], onChange: inputChangeHandler,
  //         placeholder: 'Имя контакта', onBlur: onBlurInputHandler, onClick: setActiveInputHandler,
  //         maxLength: 40, onKeyUp: onKeyUpInputHanlder
  //     }
  // ])

  async function succsessTaskHandler() {
    setSuccsessTask(true)
    setNotSuccsessTask(false)
    setCloseTask(false)
    await updateCardStatus('success', currentCart._id, currentCart.title, user.id, 'close')
    historeBack.push('/')
  }

  function notSuccsessTaskHandler() {
    setNotSuccsessTask(true)
    setSuccsessTask(false)
  }

  async function sendNotSuccessCart() {
    await updateCardStatus('refusual', currentCart._id, notSuccesCartCaption, user.id, 'close-card')
    historeBack.push('/')
  }

  async function removeCurrentCart() {
    cartDispatch(_deleteCart(carts.filter(card => card._id != currentCart._id)))
    await deleteCurrentCart(cartDispatch, currentCart._id, user.id)
    historeBack.push('/')
    localStorage.removeItem('cartCurrentInfo')
    localStorage.removeItem('cart')
  }

  useEffect(() => {
    console.log(currentCart.clientId)
    getCurrent(dispatch, currentCart.clientId)
  },[currentCart])

  useEffect(() => {
    
    const fetchData = async () => {
      setIsLoading(true)

      const { card, workers } = await getcurrentCart(dispatch, localStorage.getItem('linkCardId'))

      setIsLoading(false)

      taskdispatch(_getCurrentCartTask(card.tasks))
      setSelectedWorker(card.workers)

      setTasks(card.tasks)
      setFields(card.fields)

      dispatch(_getInvitedWorker(workers))

      setCardsInputsStates({
        ...cardsInputsStates,
        title: card.title,
        price: card.price,
        person: card.name,
        tel: card.tel,
        email: card.email,
        company: card.company,
        address: card.address,
        day: card.day
      })

      innerLogScroll()
      innerTasksScroll()
      // console.log(checkCardsResponsible(currentCart))
    }
    fetchData()
  }, [])

  useEffect(() => {
    setFields(currentCart?.fields)
  }, [currentCart])

  useEffect(() => {
    setTitle(currentCart?.title)
    setTasks(currentCart.tasks)
    taskdispatch(_getCurrentCartTask(currentCart.tasks))
    setCardsInputsStates({
      ...cardsInputsStates,
      title: currentCart.title,
      price: currentCart.price,
      person: currentCart.name,
      tel: currentCart.tel,
      email: currentCart.email,
      company: currentCart.company,
      address: currentCart.address,
      day: currentCart.day
    })
  }, [currentCart])

  function innerLogScroll() {
    logRef.current.scrollTop = logRef.current.scrollHeight
  }

  function innerTasksScroll() {
    tasksRef.current.scrollTop = tasksRef.current.scrollHeight
  }

  const closeTaskFunc = {
    closeTask,
    succsessTask,
    succsessTaskHandler,
    notSuccsessTaskHandler,
    notSuccsessTask,
    notSuccesCartCaption,
    setNotSuccesCartCaption,
    sendNotSuccessCart,
    setCloseTask,
    id: currentCart?._id,
    historeBack,
    setCloseTask
  }

  const updateCart = async (field, typeOfField) => {
    await CartService.updateCart(field, typeOfField, currentCart._id, user.id)
    await getcurrentCart(dispatch, currentCart._id)
    innerLogScroll()
  }

  const setActiveInputHandler = (e) => {
    e.target.classList.add('checked')
  }

  const onBlurInputHandler = (e, field, type) => {
    e.target.classList.remove('checked')
    if (field != currentCart[type.toLowerCase()]) {
      updateCart(field, type)
    }
  }

  function onKeyUpInputHanlder(e, field, type) {
    if (e.keyCode == 13 && currentCart[type.toLowerCase()] != field) {
      updateCart(field, type)
    }
  }

  function updaCardStage(stageId) {
    CartService.updateCartStage(stageId, currentCart._id, user.id)
  }

  async function updateField(e, id, item) {
    e.target.classList.remove('checked')
    if (fieldValue != item.value) {
      updateCardField(dispatch, currentCart._id, id, fieldValue, user.id)
      // await getcurrentCart(dispatch, currentCart._id)
      setFieldId(null)
    }
  }

  function fieldHandler(id, value) {
    return () => {
      setFieldId(id)
      setFieldValue(value)
    }
  }
  

  useEffect(()=> {
    if(logRef.current){
    innerLogScroll()
  }
  },[tasks])
  function updateCardWorker(worker, type) {
    if (type == 'ADD_WORKER') {
      updateCardWorkes(dispatch, currentCart._id, worker._id, user.id, 'ADD_WORKER')
      return
    }
    updateCardWorkes(dispatch, currentCart._id, worker._id, user.id, 'REMOVE_WORKER')
  }

  function inputChangeHandler(e, type) {
    const condition = type == 'tel' || type == 'price'
    setCardsInputsStates({
      ...cardsInputsStates,
      [type]: condition ? onlyNumber(e.target.value) : e.target.value
    })
  }

  function addNewField() {
    setActive(true)
    document.getElementsByTagName('body')[0].style.overflowY = 'hidden'
  }

  function openCreateTaskModal() {
    setAddNenTask(true)
    setIsUpdateTask(false)
    document.getElementsByTagName('body')[0].style.overflowY = 'hidden'
  }

  function closeTaskHandler() {
    if (currentCart.tasks.length != 0) {
      setTimeout(() => {
        setisCardWithOutTasks(false)
      }, 2500)
      setisCardWithOutTasks(true)
      return
    }
    setisCardWithOutTasks(false)
    setCloseTask(true)
    setTimeout(() => {
      innerTasksScroll()
    }, 0)

  }

  function showTasksColorUnit(arr) {
    const filteredTasks = arr?.filter(t => new Date(t.date) < new Date().setSeconds(0, 0))
    return filteredTasks.length > 0
      ? 'red-day'
      : tasks.filter(t => t.status == 'active').length > 0
        ? 'green-day'
        : 'orange-day'
  }

  function showTasksUnit(arr) {
    const filteredTasks = arr?.filter(t => new Date(t.date) < new Date().setSeconds(0, 0))
    return filteredTasks.length > 0
      ? `${filteredTasks.length} задачи`
      : tasks.filter(t => t.status == 'active').length > 0
        ? `${tasks.filter(t => t.status == 'active').length} задачи`
        : 'без задач'
  }

  function checkCardsResponsible(card) {
    const u = currentCart?.workers?.find(w => w._id == user.id)
    return u
  }

  return (
    <>
      {
        isLoading
          ? <Loading />
          : <div className='currentcart'>

            <div className={`alert__error ${isCardWithOutTasks ? 'active' : false}`}>
              <span>Перед тем как закрыть сделку, закройте все задачи</span>
            </div>

            <div className='container'>
              <div className='currentcart__inner'>
                <CurrentTopLine
                  path={
                    isClientCreateCard
                      ? '/clients'
                      : currentCart?.status == 'refusual'
                        ? '/analitics'
                        : '/'
                  }
                  title={title}
                  cardId={currentCart?._id}
                  card={currentCart}
                >
                  <div className={ctl.currentcartTopRight}>
                    {
                      checkCardsResponsible(currentCart) && currentCart.status == 'active'
                        ? <>
                          <button onClick={removeCurrentCart} className='currentcart__top-remove'>
                            <span>
                              Удалить
                            </span>
                          </button>
                          <BlueBtn func={closeTaskHandler}>Закрыть сделку</BlueBtn>
                        </>
                        : null
                    }
                  </div>
                </CurrentTopLine>

                <div
                  className='currentcart__content'
                  style={
                    currentCart?.status != 'active'
                      ? { pointerEvents: 'none' }
                      : { pointerEvents: 'auto' }
                  }
                >

                  <div className='currentcart__content-left'>

                    <CardHistoryBlock logRef={logRef}  currentCart = {currentCart}/>

                    <div className='currentcart__content-bottom'>
                      {
                        checkCardsResponsible(currentCart)
                          ? <button
                            onClick={openCreateTaskModal}
                            className='currentcart__content-add'
                          >
                            Добавить задачу
                          </button>
                          : null
                      }

                      <BottomTasksView
                        tasksRef={tasksRef}
                        scrollTasks = {innerLogScroll}
                        setAddNenTask={setAddNenTask}
                        setIsUpdateTask={setIsUpdateTask}
                        tasks={tasks}
                      />

                      <InputStatement innerLogScroll={innerLogScroll} />

                    </div>
                  </div>

                  <div className='currentcart__content-right'>
                    <div className='currentcart__content-Rtop'>
                      <h3 className='currentcart__content-Rtitle'>Детали</h3>
                      <span
                        className={`currentcart__content-day 
                                                    ${showTasksColorUnit(tasks)}`}
                      >
                        {showTasksUnit(tasks)}
                      </span>
                    </div>
                    <div className='currentcart__content-iw'>
                      <div className='currentcart__content-wrap'>

                        <label htmlFor='step'>Этап</label>
                        <CustomSingleSelect
                          itemsForDropDown={stages}
                          itemForView={
                            stages.find(item => item._id == currentCart?.stageId)
                          }
                          sortId={currentCart?.stageId}
                          whatToDo={updaCardStage}

                          singleSelectRef={singleSelect}
                          multiSelectRef={multiSelect}
                          whereIsSelect='FROM_CARD'
                          idType='1'
                        />

                        <label htmlFor='step'>Ответственный</label>
                        <SelectWorkers
                          workers={workers}
                          selectedWorker={selectedWorker}
                          setSelectedWorker={setSelectedWorker}
                          whatToDo={updateCardWorker}

                          singleSelectRef={singleSelect}
                          multiSelectRef={multiSelect}

                          whereIsSelect='FROM_CARD'
                          isForUpdate
                        />

                        <label htmlFor='price'>Сумма</label>
                        <input
                          type='text'
                          name='price'
                          value={cardsInputsStates.price}
                          onBlur={e => onBlurInputHandler(e, cardsInputsStates.price, 'PRICE')}
                          onClick={e => setActiveInputHandler(e)}
                          data-id={1}
                          onKeyUp={e =>
                            onKeyUpInputHanlder(e, cardsInputsStates.price, 'PRICE')}
                          onChange={e => inputChangeHandler(e, 'price')}
                          className={`${activeInputHelper}`}
                          placeholder={`Сумма, ${values.filter(item => item[0] == currency)[0][1]}`}
                          autoComplete='off'
                          maxLength={9}
                        />
                      </div>

                      <div className='currentcart__content-wrap'>
                        <h3 className='currentcart__content-Rtitle'>Клиент</h3>
                        <div className='currentcart__content-inputs'>

                          <label htmlFor='fio'>Ф.И.О</label>
                          <input
                            type='text'
                            name='fio'
                            value={cardsInputsStates.person}
                            onChange={e => inputChangeHandler(e, 'person')}
                            placeholder='Имя контакта'
                            onBlur={e => onBlurInputHandler(e, cardsInputsStates.person, 'NAME')}
                            onClick={e => setActiveInputHandler(e)}
                            autoComplete='off'
                            maxLength={40}
                            onKeyUp={e => onKeyUpInputHanlder(e, cardsInputsStates.person, 'NAME')}
                          />

                          <label htmlFor='tel'>Телефон</label>
                          <input
                            ref={ref}
                            className=''
                            type='tel'
                            name='tel'
                            value={cardsInputsStates.tel}
                            onChange={e => inputChangeHandler(e, 'tel')}
                            placeholder='Телефон'
                            onBlur={e => onBlurInputHandler(e, cardsInputsStates.tel, 'TEL')}
                            onClick={e => setActiveInputHandler(e)}
                            autoComplete='off'
                            onKeyUp={e => onKeyUpInputHanlder(e, cardsInputsStates.tel, 'TEL')}
                            maxLength={18}
                          />

                          <label htmlFor='email'>E-mail</label>
                          <input
                            className=''
                            type='email'
                            name='email'
                            value={cardsInputsStates.email}
                            onChange={e => inputChangeHandler(e, 'email')}
                            placeholder='E-mail'
                            onBlur={e => onBlurInputHandler(e, cardsInputsStates.email, 'EMAIL')}
                            onClick={e => setActiveInputHandler(e)}
                            autoComplete='off'
                            maxLength={40}
                            onKeyUp={e => onKeyUpInputHanlder(e, cardsInputsStates.email, 'EMAIL')}
                          />

                          <label htmlFor='company'>Компания</label>
                          <input
                            className=''
                            type='text'
                            name='company'
                            value={cardsInputsStates.company}
                            onChange={e => inputChangeHandler(e, 'company')}
                            placeholder='Название компании'
                            onBlur={e => onBlurInputHandler(e, cardsInputsStates.company, 'COMPANY')}
                            onClick={e => setActiveInputHandler(e)}
                            autoComplete='off'
                            maxLength={40}
                            onKeyUp={e => onKeyUpInputHanlder(e, cardsInputsStates.company, 'COMPANY')}
                          />

                          <label htmlFor='address'>Адрес</label>
                          <input
                            className=''
                            type='text'
                            name='address'
                            value={cardsInputsStates.address}
                            onChange={e => inputChangeHandler(e, 'address')}
                            placeholder='Адрес'
                            onBlur={e => onBlurInputHandler(e, cardsInputsStates.address, 'ADDRESS')}
                            onClick={e => setActiveInputHandler(e)}
                            autoComplete='off'
                            maxLength={40}
                            onKeyUp={e => onKeyUpInputHanlder(e, cardsInputsStates.address, 'ADDRESS')}
                          />

                          {

                            fields?.map(item =>
                              fieldId != item._id
                                ? <Fragment key={item._id}>
                                  <label htmlFor='inpt'>{item.title}</label>
                                  <input
                                    className={`${activeInput == item._id ? 'checked' : null}`}
                                    type='text'
                                    name='inpt'
                                    value={item.value}
                                    placeholder={item.value}
                                    onClick={fieldHandler(item._id, item.value)}
                                    onBlur={() => setFieldId(null)}
                                    onChange={e => []}
                                  />
                                </Fragment>
                                : <Fragment key={item._id}>
                                  <label htmlFor='inpt'>{item.title}</label>
                                  <input
                                    className={`${'checked'}`}
                                    type='text'
                                    name='inpt'
                                    value={fieldValue}
                                    placeholder={item.value}
                                    onBlur={e => updateField(e, item._id, item)}
                                    onChange={e => setFieldValue(e.target.value)}
                                    maxLength={40}
                                  />
                                </Fragment>
                            )

                          }
                        </div>
                        <div onClick={addNewField} className='content__blocks-add'><img/> Добавить контакт</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <NewContact
              setActive={setActive}
              active={active}
              id={currentCart._id}
              logRef={logRef}
            />

            <NewTask
              addNenTask={addNenTask}
              setAddNenTask={setAddNenTask}
              isUpdateTask={isUpdateTask}
              setIsUpdateTask={setIsUpdateTask}
              tasks={tasks}
              setTasks={setTasks}
              logRef={logRef}
              innerLogScroll={innerLogScroll}
              innerTasksScroll={innerTasksScroll}
            />
            <CloseTask {...closeTaskFunc} />
          </div>

      }
    </>
  )
}
export default withRouter(CurrentCart)
