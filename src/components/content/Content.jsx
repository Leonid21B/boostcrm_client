import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import 'scss/content.scss'
import { Redirect, withRouter } from 'react-router-dom'
import BlueBtn from 'ui/btns/BlueBtn.jsx'
import { bird, bluePlus, emoje, emoje2, urn } from 'img'
import { ContentStatesStore } from 'StoreStates'
import NewDealCart from 'components/card/NewDealCart'
import RemoveStageModal from 'componentStore/modals/RemoveStageModal'
import TopLine from 'componentStore/TopLine'
import tl from 'componentStore/moduleScss/topline.module.scss'
import SortedList from 'componentStore/SortedList'
import { useSelector, useDispatch } from 'react-redux'

import { createStage, updateStage } from 'redux/asyncRedux/CreateStage'
import { formatDateAndMonth } from 'functions/FormatDate'

import { logOut } from 'redux/asyncRedux/UserAuthAsync'
import AddComanOfSale from 'componentStore/modals/AddComanOfSale'
import { _getALLCarts, _getCartId, _getOverdueCards } from 'redux/redusers/CartReduser'
import CartService from 'requests/service/CartService'
import { s1 } from 'img/emojiesPack'
import SelectStageImg from 'ui/dropDown/SelectStageImg'
import Card from 'components/card/Card'
import MainService from 'requests/service/mainService'
import { _getStages } from 'redux/redusers/StageReduser'
import { _addComandToList, _getComand } from 'redux/redusers/ComandOfSalesReduser'
import { _getInvitedWorker } from 'redux/redusers/WorkerReduser'
import { _getALLTask } from 'redux/redusers/NewTaskReduser'
import { _getUserInfo } from 'redux/redusers/UserReduser'
import { _getCompanyPaymentDate, _getCompanySpace, _getCompanyTakenSpace } from 'redux/redusers/CompanyReduser'
import Loading from 'ui/loading/Loading'
import useRequest from './hooks/useRequest'
import { clickOnStageTitle, createNewStage, updateStageTitle } from './functions/stageHandlers'
import useActive from './hooks/useActive'
import useInput from './hooks/useInput'
import { clickButtonToShowCreateCard } from './functions/clickButtonCreateCard'
import selectMenuItem from './hooks/useSelectMenuItem'
import dragCardHandler from './functions/dragCardHandler'
import { sortCardByTasksLength, sortCardsByDate } from './functions/sortCards'
import { checkWhoManageAccess } from './functions/checkWhoManageAccess'
import getLengthData from './functions/getLengthData'
import FilterMenu from 'ui/deals/FilterMenu'

function Content() {
  const { removeStage, setIsLoading } = useContext(ContentStatesStore)

  const dispatch = useDispatch()

  const { carts } = useSelector(state => state.newCart)
  const { tasks } = useSelector(state => state.newTask)
  const { user, userId } = useSelector(state => state.user)
  const { stages } = useSelector(state => state.newStages)
  const { comandId } = useSelector(state => state.comand)
  const { space, takenSpace, paymentDate } = useSelector(state => state.companySpace)
  const [arrForCards, setArrForCards] = useState(carts)

  const [checkBoxSortMenuStates, setCheckBoxSortMenuStates] = useState({
    cardsLength: 0,
    cardsTasksLength: 0,
    cardsWithoutTasks: 0,
    overdueCardsTasks: 0
  })

  const [activeSetStageImg, setActiveSetStageImg] = useState(false)
  const [currentActiveStateImg, setCurrentActiveStateImg] = useState(false)

  const [activeUpdateStageImg, setActiveUpdateStageImg] = useState(false)

  const stageImg = useRef()
  const updateStageImgRef = useRef()

  const [activeStageImg, setActiveStageImg] = useState('')

  // const [newStageTitle, setNewStageTitle] = useState('')

  const [newStageActive, setNewStageActive] = useState(false)
  const [maxCards,setMax]  = useState(0)
  const [stageId, setStageId] = useState('')
  const [seacrh, setSeacrh] = useState('')

  const [userAndComandCards, setUserAndComandCards] = useState(carts)
  const [stageColumnID, setStageColumnID] = useState('')
  // const [active, setactive] = useState(false)
  const columns = document.querySelectorAll('.content__blocks-column')
  useEffect(() => {
    let max = maxCards
    for (let it of columns){
      if (it.children[0].children.length > max){
        max = it.children[0].children.length
      }
    }
    if(max != maxCards){
      setMax(max)
      console.log(max)
    }
  },[columns])

  const menuRef = useRef()
  const cardRef = useRef()
  const inputRef = useRef()

  const [currentStage, setCurrentStage] = useState('')
  const [currentCard, setCurrentCard] = useState('')

  const [stageTrigger, setStageTrigger] = useState(false)
  const [stageTitle, setStageTitle] = useState('')

  const [contentLoading, setContentLoading] = useState(false)

  // const [isRedact, setIsRedact] = useState(false)

  const [stageTitleError, setStageTitleError] = useState(false)
  const [createStageStateTitle, setCreateStageStateTitle] = useState(false)

  const [isTasksToday, setIsTasksToday] = useState(false)

  function getData() {
    const whatIsThis = checkWhoManageAccess(userId, comandId)

    if (whatIsThis) {
      return whatIsThis === 'user'
        ? MainService.getCurrentUserCards({ userId: userId })
        : MainService.getCurrentComandCards({ comandId: comandId })
    }

    return MainService.getAllDealInfo({ userId: user?.id })
  }

  const { loading, error } = useRequest(
    getData,
    checkWhoManageAccess(userId, comandId)
      ? [
        _getCompanySpace, _getCompanyTakenSpace,
        _getALLCarts, _getALLTask, _getOverdueCards
      ]
      : [
        _getCompanySpace, _getCompanyTakenSpace,
        _getCompanyPaymentDate, _getUserInfo,
        _getALLCarts, _getStages, _getComand, _getInvitedWorker,
        _getALLTask, _getOverdueCards
      ]
    ,
    checkWhoManageAccess(userId, comandId)
      ? [
        'space', 'takenSpace',
        'cards', 'tasks', 'overdueCards'
      ]
      : [
        'space', 'takenSpace',
        'paymentDate', 'userData',
        'cards', 'stages',
        'comands', 'workers',
        'tasks', 'overdueCards'
      ],
    (data) => {
      setArrForCards(data.cards)
      setUserAndComandCards(data.cards)

      setCheckBoxSortMenuStates({
        ...checkBoxSortMenuStates,
        cardsLength: getLengthData(data.cards, 'length'),
        cardsTasksLength: getLengthData(data.tasks, 'date'),
        cardsWithoutTasks: data.cards.filter(c => !c.tasks.length).length,
        overdueCardsTasks: getLengthData(data.overdueCards, 'length')
      })
    }
  )

  useEffect(() => {
    setArrForCards(carts)
    setUserAndComandCards(carts)

    setCheckBoxSortMenuStates({
      ...checkBoxSortMenuStates,
      cardsLength: getLengthData(carts, 'length'),
      cardsTasksLength: getLengthData(tasks, 'date'),
      cardsWithoutTasks: getLengthData(carts.filter(c => !c.tasks.length), 'length'),
      overdueCardsTasks: tasks.filter(t => new Date(t.date).setSeconds(0, 0) < new Date().setSeconds(0, 0)).length
    })
  }, [carts])

  const [activeCreateComandModal, setActiveCreateComandModal] = useActive(false)
  const [isRedactComand, setIsRedactComand] = useActive(false)

  const stageInputHanlder = useInput('', (e) => {
    const title = e.target.value.length > 0
    setNewStageActive(title)
  })

  const { dragOverHandler, dropCardHandler } = dragCardHandler(
    {
      currentStage,
      arrForCards,
      currentCard,
      setArrForCards,
      userId: user.id
    }
  )

  function updateStageImg(title, id) {
    return async () => {
      setActiveUpdateStageImg(!activeUpdateStageImg)
      setStageColumnID(id)
      setStageTitle(title)
    }
  }

  function closeImgDropDown() {
    setActiveUpdateStageImg(false)
  }

  function closeCreateStageImgDropDown() {
    setActiveSetStageImg(false)
  }

  function createStageInputOnBlur(e) {
    // if (newStageTitle.length > 0) {
    if (stageInputHanlder.value.length > 0) {
      e.target.blur()
      return
    }
    setCreateStageStateTitle(false)
    setCurrentActiveStateImg(false)
  }

  // Drag Horizontal scroll

  let isDown = false
  const isCard = false
  let startX
  let scrollLeft
  const contentBlocksRef = useRef()

  function onMouseDodwn(e) {
    // if (e.target.dataset.type === 'Column') {
    isDown = true
    startX = e.pageX - contentBlocksRef.current.offsetLeft
    scrollLeft = contentBlocksRef.current.scrollLeft
  }

  function onMouseLeave(e) {
    isDown = false
  }

  function onMouseUp(e) {
    isDown = false
  }

  function onMouseMove(e) {
    if (e.target.dataset.type === 'Column') {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - contentBlocksRef.current.offsetLeft
      const walk = x - startX
      contentBlocksRef.current.scrollLeft = scrollLeft - walk
      // console.log('walk', walk);
    }
  }

  function checkTakenSpace(targetSpace) {
    const result = targetSpace > 1024 ? Math.floor(targetSpace / 1024) : takenSpace
    return result
  }

  // useEffect(() => {
  //     document.addEventListener('scroll', loadDealsWhileScroling)
  //     return () => {
  //         document.removeEventListener('scroll', loadDealsWhileScroling)
  //     }
  // }, []);

  // let nextPage = 2
  // let unit = null
  // async function loadDealsWhileScroling(e) {
  //     // console.log('e', e.target.scrollHeight)
  //     unit = e.target.scrollHeight - (e.target.scrollTop + window.innerHeight)
  //     const t = document.documentElement.getBoundingClientRect()

  //     console.log(
  //         {
  //             unit,
  //             t:t.bottom,
  //         }
  //     );
  //     // if (t.bottom <= document.documentElement.clientHeight) {
  //     if (unit <= 100) {
  //         console.log('first');
  //         // const cl = await ClientService.get(user.id, limit, nextPage).then(data => data.data)
  //         // nextPage++
  //         // setArrayOfClients(prev => [...prev, ...cl.clients])
  //     }
  // }

  return (
    <div className='content'>
      {
        loading
          ? <Loading />
          : <>
            <div className='container containerM'>
              <div className='content__inner'>
                <TopLine title='Сделки'>
                  <div className={tl.firstseacrch}>
                    {
                      user?.role === 'admin'
                        ? <span>
                          занято {checkTakenSpace(takenSpace)} {takenSpace > 1024 ? 'GB' : 'MB'} / {space}GB до {formatDateAndMonth(paymentDate)}
                        </span>
                        : null
                    }

                    <input
                      className='inp'
                      type='search'
                      placeholder='Поиск'
                      value={seacrh}
                      onChange={e => setSeacrh(e.target.value)}
                    />
                  </div>
                  {
                    user?.role === 'admin'
                      ? <button className='create_new_comand_btn'
                        onClick={setActiveCreateComandModal(true)}
                      >
                        Создать команду продаж
                      </button>
                      : null
                  }

                </TopLine>

                <div className='content__second-line'>

                  <FilterMenu
                    setArrForCards={setArrForCards}
                    userAndComandCards={userAndComandCards}
                    tasks={tasks}
                    setIsTasksToday={setIsTasksToday}
                    checkBoxSortMenuStates={checkBoxSortMenuStates}
                  />

                  <SortedList
                    setArrForCards={setArrForCards}
                    setUserAndComandCards={setUserAndComandCards}
                    checkBoxSortMenuStates={checkBoxSortMenuStates}
                    setCheckBoxSortMenuStates={setCheckBoxSortMenuStates}
                    setContentLoading={setContentLoading}
                  />
                </div>
              </div>
            </div>

            <div
              className='content__blocks-wrapper'
              onMouseDown={onMouseDodwn}
              onMouseLeave={onMouseLeave}
              onMouseUp={onMouseUp}
              onMouseMove={onMouseMove}
              // onScroll={ loadDealsWhileScroling }
              ref={contentBlocksRef}
            >
              <div
                className='content__blocks'
                // onMouseDown={ onMouseDodwn }
                // onMouseLeave={ onMouseLeave }
                // onMouseUp={ onMouseUp }
                // onMouseMove={ onMouseMove }
                data-type='contentBlocks'
              >
                {
                  stages && stages.length
                    ? stages.map(stage =>
                      <div
                        key={stage._id}
                        onDragOver={e => dragOverHandler(e)}
                        onDrop={e => dropCardHandler(e, stage)}
                        className='content__blocks-column column'
                        data-type='Column'
                      >

                        <div data-length={maxCards} style={{height:`${100 * maxCards + 50}px`}}>
                          <div
                            className={`content__block-title 
                                              ${stageColumnID === stage._id ? 'active' : ''} `}
                            onMouseLeave={closeImgDropDown}
                          >
                            <img
                              className='content__block-title-img selectImgParent'
                              onClick={user?.role === 'admin'
                                ? updateStageImg(
                                  stageTitle.length > 0
                                    ? stageTitle
                                    : stage.title
                                  , stage._id
                                )
                                : null}
                              ref={stageColumnID === stage._id ? updateStageImgRef : null}
                              draggable={false}
                              src={
                                stage.stageImg?.length
                                  ? `${process.env.REACT_APP_STATIC_PATH}/${stage.stageImg}`
                                  : s1
                              } alt=''
                            />
                            {
                              stageColumnID === stage._id
                                ? <SelectStageImg
                                  activeSetStageImg={
                                    activeUpdateStageImg
                                  }
                                  setActiveSetStageImg={setActiveUpdateStageImg}
                                  stageImg={updateStageImgRef}
                                  setActiveStageImg={setActiveStageImg}
                                />
                                : null
                            }
                            {
                              stageColumnID === stage._id && stageTrigger
                                ? <input
                                  type='text'
                                  value={stageTitle}
                                  onChange={e => setStageTitle(e.target.value)}
                                  ref={inputRef}
                                  onBlur={e => e.target.blur()}
                                  className={`${stageTitleError ? 'inputError' : null}`}
                                  maxLength={20}
                                />
                                : <input
                                  type='text'
                                  value={stage?.title}
                                  onChange={e => { }}
                                  onClick={
                                    user?.role === 'admin'
                                      // ? stageHandler(stage)
                                      ? clickOnStageTitle(stage, (stageId, title) => {
                                        setStageColumnID(stageId)
                                        setStageTitle(title)
                                        setStageTrigger(true)
                                      })
                                      : null
                                  }
                                  style={user?.role === 'admin'
                                    ? { pointerEvents: 'auto' }
                                    : { pointerEvents: 'none' }}
                                />
                            }
                            <span className='content__block-title-action'>
                              <img
                                onClick={
                                  updateStageTitle(
                                    {
                                      stage, updateStageImgRef, stageTitle, stageImg
                                    },
                                    async (img) => {
                                      setStageTitleError(false)
                                      await updateStage(
                                        dispatch, stage._id, stageTitle, img, user.id)
                                      setStageTrigger(false)
                                      setStageColumnID(null)
                                    },
                                    () => {
                                      setStageTrigger(false)
                                      setStageColumnID(null)
                                    })
                                }
                                src={bird}
                                alt=''
                              />
                              <img
                                onClick={() => removeStage(stage._id)}
                                src={urn}
                                alt=''
                              />
                            </span>
                          </div>

                          <div
                            onClick={clickButtonToShowCreateCard(stage._id, setStageId)}
                            className='content__blocks-add'
                            onMouseDown={e => e.target.classList.add('focus')}
                            onMouseUp={e => e.target.classList.remove('focus')}
                            onMouseLeave={e => e.target.classList.remove('focus')}
                          >
                            <img src='' alt='' />
                            Новая сделка
                          </div>

                          <NewDealCart
                            currentStage={stage._id}
                            stageID={stageId}
                            setStageId={setStageId}
                          />

                          {
                            arrForCards
                              .sort(sortCardsByDate)
                              .sort(sortCardByTasksLength)
                              .filter(item =>
                                item.title.toLowerCase().includes(seacrh.toLowerCase())
                              )
                              .map(card =>
                                card.stageId === stage._id
                                  ? <Card
                                    key={card._id}
                                    card={card}
                                    stage={stage}
                                    setIsLoading={setIsLoading}
                                    setCurrentCard={setCurrentCard}
                                    setCurrentStage={setCurrentStage}
                                    cardRef={cardRef}
                                    isTasksToday={isTasksToday}
                                  />
                                  : null
                              )
                          }
                          <RemoveStageModal data={{ id: stage._id, stage, userId: user?.id }} />
                        </div>
                      </div>
                    )
                    : null
                }
                {
                  user?.role === 'admin'
                    ? <div className='content__blocks-column'>
                      <div
                        className='content__blocks-stage-wrapper selectImgParent'
                        onMouseLeave={closeCreateStageImgDropDown}
                        onClick={() => setCurrentActiveStateImg(true)}
                      >
                        <img
                          onClick={() => setActiveSetStageImg(!activeSetStageImg)}
                          src={currentActiveStateImg ? emoje2 : emoje}
                          ref={stageImg}
                        />
                        <SelectStageImg
                          activeSetStageImg={activeSetStageImg}
                          setActiveSetStageImg={setActiveSetStageImg}
                          stageImg={stageImg}
                          setActiveStageImg={setActiveStageImg}
                        />
                        <input
                          onClick={() => setCreateStageStateTitle(true)}
                          onBlur={createStageInputOnBlur}
                          value={stageInputHanlder.value}
                          onChange={stageInputHanlder.onChange}
                          className={`content__blocks-stage ${createStageStateTitle ? 'active' : null}`}
                          type='text'
                          placeholder='Название этапа'
                          maxLength={20}
                        />

                        <div
                          className={`content__blocks-stage-btns ${newStageActive ? 'active' : ''}`}
                          style={stageInputHanlder.value.length > 0
                            ? { pointerEvents: 'auto' }
                            : { pointerEvents: 'none' }}
                        >
                          <img
                            onClick={
                              createNewStage(
                                stageImg,
                                dispatch,
                                stageInputHanlder.value,
                                user.id,
                                stageInputHanlder.resetInputValue,
                                [
                                  setNewStageActive,
                                  setActiveSetStageImg,
                                  setCurrentActiveStateImg,
                                  setCreateStageStateTitle
                                ]
                              )
                            }
                            src={bird}
                            alt=''
                          />
                        </div>
                      </div>

                    </div>
                    : null
                }
              </div>
            </div>
          </>

      }

      {
        user?.role === 'admin'
          ? <AddComanOfSale
            active={activeCreateComandModal}
            setActive={setActiveCreateComandModal(false)}
            isRedact={isRedactComand}
            setIsRedact={setIsRedactComand(false)}
          />
          : null
      }
    </div>
  )
}

export default withRouter(Content)
