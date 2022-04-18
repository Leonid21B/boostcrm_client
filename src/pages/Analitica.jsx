import React, { useEffect, useRef, useState, Fragment } from 'react'
import TopLine from 'componentStore/TopLine'
import 'scss/analitica.scss'
import { activeItem, arrowdwn, clamphand, dis, emoje, hand, leftArrow, rightArrow, smile, urn } from 'img'
import AnaliticaResult from './current/AnaliticaResult'

import { useDispatch, useSelector } from 'react-redux'

import { getUserInfo, logOut, updateUserPassword } from 'redux/asyncRedux/UserAuthAsync'
import AnaliticaNotSuccessModal from 'componentStore/modals/AnaliticaNotSuccessModal'
import { s1, s2 } from 'img/emojiesPack'
import MainService from 'requests/service/mainService'
import { _getALLCarts, _getNotSuccessCart, _getSuccessCart } from 'redux/redusers/CartReduser'
import { _getInvitedWorker } from 'redux/redusers/WorkerReduser'
import { _getUserInfo } from 'redux/redusers/UserReduser'
import ComandCard from 'ui/analitics/ComandCard'
import { _getStages } from 'redux/redusers/StageReduser'
import { _setComandToList, _getCurrentComand, _removeComandFromList, _getComand } from 'redux/redusers/ComandOfSalesReduser'
import AnaliticaSuccessModal from 'componentStore/modals/AnaliticaSuccessModal'
import { checkComandInList } from 'functions/CheckComandInListAnalitics'
import Loading from 'ui/loading/Loading'
import { clientsSmile, dealsSmile, refusualSmile, successSmile } from 'img/analitica'
import { countPercent } from 'ui/analitics/functions/CountPersent'
import { countMovementCard } from 'ui/analitics/functions/CountMovementCard'

function Analitica () {
  const [selected, setSelected] = useState(true)

  const dispatch = useDispatch()
  const { comands, currentComand, comandListView, dropDownComands } = useSelector(state => state.comand)
  const { carts, successCarts, notSuccessCarts } = useSelector(state => state.newCart)
  const { user } = useSelector(state => state.user)

  const [stages, setStages] = useState([])

  const [comandsOfCompany, setComandsOfCompany] = useState([])
  const [comandsList, setComandsList] = useState([])

  const [selectedComand, setSelectedComand] = useState(comands)

  const [analiticsLoading, setanaliticsLoading] = useState(false)
  const [analiticsTopBlocksState, setAnaliticsTopBlocksState] = useState({
    clientsLength: 0,
    cardsLength: 0,
    successLength: 0,
    refusalLength: 0
  })

  const [stageCards, setStageCards] = useState([])

  const comandRef = useRef()
  const comandListSelectRef = useRef()
  const dateRef = useRef()
  const changeMonthRef = useRef()

  const [comandId, setComandId] = useState(user.companyId)

  const [activeNotSuccessModal, setActiveNotSuccessModal] = useState(false)
  const [activeSuccessModal, setActiveSuccessModal] = useState(false)

  const [selectComandTitle, setSelectComandTitle] = useState('Все отделы')

  const [month, setMonth] = useState([
    { id: 0, m: 'Январь' },
    { id: 1, m: 'Февраль' },
    { id: 2, m: 'Март' },
    { id: 3, m: 'Апрель' },
    { id: 4, m: 'Май' },
    { id: 5, m: 'Июнь' },
    { id: 6, m: 'Июль' },
    { id: 7, m: 'Август' },
    { id: 8, m: 'Сентябрь' },
    { id: 9, m: 'Октябрь' },
    { id: 10, m: 'Ноябрь' },
    { id: 11, m: 'Декабрь' }
  ])

  // let mIndex = monthIndex
  const settertMonthIndex = new Date().getMonth()
  const [monthIndex, setMonthIndex] = useState(settertMonthIndex)

  useEffect(() => {
    async function fetchdata () {
      if (localStorage.getItem('token')) {
        // const destrucuredAnaliticsData = user.role == 'admin'
        //     ? { cards, clients, refusual, success, workers, stages, userInfo, allComands }
        // const destrucuredAnaliticsData = user.role == 'admin'
        //     : { worker, stages, comand, cards, refusualCards, successCards, clients }

        if (user.role == 'admin') {
          setanaliticsLoading(true)
          const { cards, clients, refusual, success, workers, stages, userInfo, allComands } =
                        await MainService.getAnaliticsInfo({ userId: user.id }).then(data => data.data)

          setanaliticsLoading(false)
          // setComandsList(allComands)

          // same
          setAnaliticsTopBlocksState({
            ...analiticsTopBlocksState,
            clientsLength: clients,
            cardsLength: cards.length,
            successLength: success.length,
            refusalLength: refusual.length
          })

          dispatch(_getInvitedWorker(workers))
          dispatch(_getNotSuccessCart(refusual))
          dispatch(_getUserInfo(userInfo))
          dispatch(_getComand(allComands))
          dispatch(_getALLCarts(cards))
          dispatch(_getSuccessCart(success))

          setStageCards(stages)
          setStages(stages)

          setComandsOfCompany(allComands.filter(item => item._id == userInfo.comandId))
          // setComandsList(allComands.filter(item => item._id != userInfo.comandId))

          setComandsList(allComands)
          checkComandInList(comandListView, allComands, setComandsList)

          return
        }

        setanaliticsLoading(true)

        const { worker, stages, comand, cards, refusualCards, successCards, clients } =
                    await MainService.getAnaliticsInfo({ userId: user.id }).then(data => data.data)

        dispatch(_getUserInfo(worker))

        dispatch(_getNotSuccessCart(refusualCards))
        dispatch(_getSuccessCart(successCards))

        dispatch(_getStages(stages))
        setStages(stages)

        dispatch(_getCurrentComand(comand))
        dispatch(_getALLCarts(cards))

        setanaliticsLoading(false)
        setAnaliticsTopBlocksState({
          ...analiticsTopBlocksState,
          clientsLength: clients,
          cardsLength: cards.length,
          successLength: successCards.length,
          refusalLength: refusualCards.length
        })
        return
      }
      logOut(dispatch)
    }
    fetchdata()
  }, [])

  useEffect(() => {
    // setMonthIndex(monthIndex)
    // console.log('monthIndex', monthIndex);
    // getAnaliticsInfoByDate('MONTH', changeMonthRef.current, 'month')
  }, [monthIndex])

  function openDropDown (e) {
    if (comandsList.length != 0) {
      if (e.target.dataset.type == 'input') {
        comandRef.current.classList.toggle('open')
        return
      }
      // console.log(`e.target.dataset.type`, e.target)
    }
    if (e.target.dataset.type == 'selectComands') {
      comandListSelectRef.current.classList.toggle('open')
      return
    }
    if (e.target.dataset.type == 'selectedComand' || e.target.dataset.type == 'selectedItem') {
      selectedItem(e.target.dataset)
      console.log('e.target.dataset', e.target.dataset)
    }
  }

  async function selectedItem ({ id, type }) {
    if (type == 'selectedItem') {
      if (!comandListSelectRef.current.querySelector(`[data-id="${id}"]`).classList.contains('selected')) {
        comandListSelectRef.current.querySelectorAll('[data-type="selectedItem"]')
          .forEach(item => { item.classList.remove('selected') })

        comandListSelectRef.current.querySelector(`[data-id="${id}"]`).classList.add('selected')

        comandListSelectRef.current.classList.remove('open')
        if (id != 1) {
          setComandId(id)
          setSelectComandTitle(comands.find(c => c._id == id).title)
          const { clients, cards, success, refusual } =
                        await MainService.getCurrentAnaliticsInfo({ comandId: id }).then(data => data.data)

          setAnaliticsTopBlocksState({
            ...analiticsTopBlocksState,
            clientsLength: clients,
            cardsLength: cards,
            successLength: success.length,
            refusalLength: refusual.length
          })

          setSelectedComand(comands.filter(comand => comand._id == id))
          dispatch(_getSuccessCart(success))
          dispatch(_getNotSuccessCart(refusual))
          return
        }

        setSelectComandTitle('Все отделы')
        setComandId(user.companyId)
        const { cards, clients, refusual, success, workers, stages, userInfo, allComands } =
                    await MainService.getAnaliticsInfo({ userId: user.id }).then(data => data.data)
        setanaliticsLoading(false)

        setAnaliticsTopBlocksState({
          ...analiticsTopBlocksState,
          clientsLength: clients,
          cardsLength: cards.length,
          successLength: success.length,
          refusalLength: refusual.length
        })

        dispatch(_getInvitedWorker(workers))
        dispatch(_getNotSuccessCart(refusual))
        dispatch(_getUserInfo(userInfo))
        dispatch(_getALLCarts(cards))
        dispatch(_getSuccessCart(success))
        setStageCards(stages)
        // setComands(allComands)
        setStages(stages)
        setComandsOfCompany(allComands.filter(item => item._id == userInfo.comandId))
        setComandsList(allComands.filter(item => item._id != userInfo.comandId))
        setSelectedComand(allComands)
        return
      }
      return
    }
    if (!comandRef.current.querySelector(`[data-id="${id}"]`).classList.contains('selected')) {
      if (type == 'selectedComand') {
        dispatch(_setComandToList(comands.find(cmd => cmd._id == id)))

        setComandsOfCompany(prev => [...comandsOfCompany, comands.find(cmd => cmd._id == id)])
        setComandsList([...comandsList.filter(item => item._id != id)])
        comandRef.current.classList.remove('open')
      }
    }
  }

  function removeComandFromList (id) {
    dispatch(_removeComandFromList(comandListView.filter(c => c._id != id)))

    setComandsOfCompany(prev => comandsOfCompany.filter(item => item._id != id))
    // setComandsList(prev => [...comandsList, ...comandsOfCompany.filter(item => item._id == id)])
    setComandsList(prev => [...comandsList, ...comandListView.filter(item => item._id == id)])
  }

  function openModalNotSuccess () {
    setActiveNotSuccessModal(true)
  }

  function openModalSuccess () {
    setActiveSuccessModal(true)
  }

  async function getAnaliticsInfoByDate (type, e, currentMonthIndex) {
    console.log({
      type,
      e: e.target,
      currentMonthIndex
    })
    if (!e.classList.contains('active') && type != 'MONTH' && type != 'CHANGE_MONTH') {
      dateRef.current.querySelectorAll('[data-type="date"]').forEach(d => { d.classList.remove('active') })
      e.classList.add('active')

      if (user.role == 'admin') {
        const { clients, cards, success, refusual, workers } =
                    await MainService.getAnaliticsInfoByDate(
                      { type: type, userId: user.id, comandId: comandId, unitMonth: new Date().getMonth() }
                    )
                      .then(data => data.data)

        setAnaliticsTopBlocksState({
          ...analiticsTopBlocksState,
          clientsLength: clients,
          cardsLength: cards,
          successLength: success.length,
          refusalLength: refusual.length
        })
        dispatch(_getInvitedWorker(workers))
        dispatch(_getNotSuccessCart(refusual))
        dispatch(_getSuccessCart(success))

        return
      }

      const { clients, cards, success, refusual } =
                await MainService.getAnaliticsUserInfoByDate({ type: type, userId: user.id, unitMonth: monthIndex })
                  .then(data => data.data)

      setAnaliticsTopBlocksState({
        ...analiticsTopBlocksState,
        clientsLength: clients,
        cardsLength: cards,
        successLength: success.length,
        refusalLength: refusual.length
      })
      dispatch(_getNotSuccessCart(refusual))
      dispatch(_getSuccessCart(success))
      return
    }
    if(type == 'MONTH'){
      dateRef.current.querySelectorAll('[data-type="date"]').forEach(d => { d.classList.remove('active') })
      e.classList.add('active')
      console.log(monthIndex)
      if (user.role == 'admin') {
        const { clients, cards, success, refusual, workers } =
          await MainService.getAnaliticsInfoByDate(
            { type: type, userId: user.id, comandId: comandId, unitMonth: monthIndex }
          )
            .then(data => data.data)

        setAnaliticsTopBlocksState({
          ...analiticsTopBlocksState,
          clientsLength: clients,
          cardsLength: cards,
          successLength: success.length,
          refusalLength: refusual.length
        })
        dispatch(_getInvitedWorker(workers))
        dispatch(_getNotSuccessCart(refusual))
        dispatch(_getSuccessCart(success))

        return
      }
      
    }
    if(type == 'CHANGE_MONTH'){
      dateRef.current.querySelectorAll('[data-type="date"]').forEach(d => { d.classList.remove('active') })
      changeMonthRef.current.classList.add('active')
      console.log(monthIndex)
      if (user.role == 'admin') {
        const { clients, cards, success, refusual, workers } =
          await MainService.getAnaliticsInfoByDate(
            { type:'MONTH', userId: user.id, comandId: comandId, unitMonth: currentMonthIndex }
          )
            .then(data => data.data)

        setAnaliticsTopBlocksState({
          ...analiticsTopBlocksState,
          clientsLength: clients,
          cardsLength: cards,
          successLength: success.length,
          refusalLength: refusual.length
        })
        dispatch(_getInvitedWorker(workers))
        dispatch(_getNotSuccessCart(refusual))
        dispatch(_getSuccessCart(success))

        return
      }

    }
    e.classList.remove('active')
  }

  let monthM = new Date().getMonth()
  useEffect(() => {
    setMonthIndex(monthM)
  },[])
  function changeMonth (e, side) {

     console.log('target', side, e)
     if (side == 1) {
         if (monthIndex == 0) return
         getAnaliticsInfoByDate('CHANGE_MONTH', changeMonthRef.current, monthIndex - 1)
        console.log('targetValue', monthIndex)
         setMonthIndex(it => it - 1)
         return
      }else{
        if (monthIndex == 11) return

        setMonthIndex(it => it + 1)
        console.log(monthIndex + 2)
        getAnaliticsInfoByDate('CHANGE_MONTH', changeMonthRef.current, monthIndex + 1)
        console.log('targetValue', monthIndex)
     }
  }

  return (
    <div className='analitics'>
      {
                analiticsLoading
                  ? <Loading />
                  : <div className='container'>
                    <TopLine title='Аналитика' />
                    <div className='analitics__settings'>
                      <div className='analitics__settings-left'>
                        <button
                          onClick={() => setSelected(true)}
                          className={selected ? 'active' : null}
                        >Сводка
                        </button>
                        {
                                    user.role == 'admin'
                                      ? <button
                                          onClick={() => setSelected(false)}
                                          className={selected ? null : 'active'}
                                        >
                                        Результаты сотрудников
                                      </button>
                                      : null
                                }

                      </div>
                      <div className='analitics__settings-right' ref={dateRef}>
                        {
                                    user.role == 'admin'
                                      ? <div
                                          onClick={e => openDropDown(e)}
                                          ref={comandListSelectRef}
                                          data-type='selectComands'
                                          className='analitics__select first'
                                        >
                                        <div
                                          className='analitics__select-input'
                                          data-type='selectComands'
                                        >
                                          <div className='analitics__select-input-wrap'>
                                            <span>{selectComandTitle}</span>
                                            <img src={arrowdwn} alt='' />
                                          </div>
                                        </div>
                                        <div className='analitics__select-dropDown oVY'>
                                          <ul>
                                            <li
                                              data-id={1}
                                              data-type='selectedItem'
                                              className='selectedItem comand_item selected'
                                            >
                                              <img className='customSelectedItemImg' src={activeItem} alt='' />
                                              <span>
                                                Все отделы
                                              </span>
                                            </li>
                                            {
                                                        comands.map(item =>
                                                          <li
                                                            key={item._id}
                                                            data-id={item._id}
                                                            data-type='selectedItem'
                                                            className='selectedItem comand_item'
                                                          >
                                                            <img className='customSelectedItemImg' src={activeItem} alt='' />
                                                            <span>
                                                              {item.title}
                                                            </span>
                                                          </li>
                                                        )
                                                    }
                                          </ul>
                                        </div>
                                      </div>
                                      : null
                                }

                        <span
                          onClick={e => getAnaliticsInfoByDate('TODAY', e.target, 'today')}
                          data-type='date'
                        >
                          Сегодня
                        </span>
                        <span
                          onClick={e => getAnaliticsInfoByDate('YESTERDAY', e.target, 'yesterday')}
                          data-type='date'
                        >

                          Вчера
                        </span>
                        <span
                          onClick={e => getAnaliticsInfoByDate('WEEK', e.target, 'week')}
                          data-type='date'
                        >
                          Неделя
                        </span>
                        <span>
                          <img onClick={e => changeMonth(e, 1)} src={leftArrow} alt='' />
                            <span ref={changeMonthRef} onClick={(e) => getAnaliticsInfoByDate('MONTH', e.target, 'month')}>
                              {month[monthIndex]?.m}
                            </span>
                          <img onClick={e => changeMonth(e, 2)} src={rightArrow} alt='' />
                        </span>
                      </div>
                    </div>
                    {
                            selected
                              ? <>
                                <div className='analitics__items'>
                                  <ul>
                                    <li className='analitics__item'>
                                      <div className='analitics__item-left'>
                                        <span>Новых клиентов</span>
                                        <span>{analiticsTopBlocksState.clientsLength}</span>
                                      </div>
                                      <div className='analitics__item-right'>
                                        <img src={clientsSmile} alt='' />
                                      </div>
                                    </li>
                                    <li className='analitics__item'>
                                      <div className='analitics__item-left'>
                                        <span>Новых сделок</span>
                                        <span>{analiticsTopBlocksState.cardsLength}</span>
                                      </div>
                                      <div className='analitics__item-right'>
                                        <img src={dealsSmile} alt='' />
                                      </div>
                                    </li>
                                    <li className='analitics__item' onClick={openModalSuccess}>
                                      <div className='analitics__item-left'>
                                        <span>Сделок “Выполнено”</span>
                                        <span className='succsess'>
                                          {
                                                            analiticsTopBlocksState.successLength
                                                        }
                                        </span>
                                      </div>
                                      <div className='analitics__item-right'>
                                        <img src={successSmile} alt='' />
                                      </div>
                                    </li>
                                    <li className='analitics__item' onClick={openModalNotSuccess}>
                                      <div className='analitics__item-left'>
                                        <span>Сделок “Отказ”</span>
                                        <span className='alert'>
                                          {
                                                            analiticsTopBlocksState.refusalLength
                                                        }
                                        </span>
                                      </div>
                                      <div className='analitics__item-right'>
                                        <img src={refusualSmile} alt='' />
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                                {
                                        user.role == 'admin'
                                          ? <div className='analitics__blocks'>
                                            {
                                                    user.role == 'admin'
                                                      ? comandListView?.map(cmd =>
                                                        <ComandCard
                                                          key={cmd._id}
                                                          cmd={cmd}
                                                          stageCards={stageCards}
                                                          carts={carts.filter(card => card.comandId == cmd._id)}
                                                          removeComandFromList={removeComandFromList}
                                                          success={successCarts.filter(card => card.comandId == cmd._id)}
                                                          refusual={notSuccessCarts.filter(card => card.comandId == cmd._id)}
                                                        />
                                                        )
                                                      : null
                                                }

                                            <div className='analitics__blocks-right'>
                                              <div
                                                onClick={e => openDropDown(e)}
                                                data-type='input'
                                                ref={comandRef}
                                                className={`analitics__blocks-select customSelect ${comandsList.length == 0 ? 'analitics__blocks-right-select' : null} `}
                                              >
                                                <div className='select__comand-input'>
                                                  <div className='select__comand-input-left'>
                                                    <img src={emoje} alt='' />
                                                    <span id='title'>Добавить команду продаж для сравнения </span>
                                                  </div>
                                                  <img src={arrowdwn} alt='' />
                                                </div>
                                                <div className='selectDropDown-items'>
                                                  <ul className='select__comand-list'>
                                                    {
                                                                    comandsList
                                                                    .sort((a,b) => b.createdAt - a.createdAt)
                                                                    .map(comand =>
                                                                      <li
                                                                        key={comand._id}
                                                                        data-id={comand._id}
                                                                        data-type='selectedComand'
                                                                        className='select__comand-item'
                                                                      >
                                                                        <img
                                                                          src={
                                                                                comand.comandImg.length != 0
                                                                                  ? `${process
                                                                                        .env
                                                                                        .REACT_APP_STATIC_PATH}/${comand.comandImg}`
                                                                                  : s1
                                                                            } alt=''
                                                                        />
                                                                        {
                                                                                comand.title
                                                                            }
                                                                      </li>
                                                                    )
                                                                }
                                                  </ul>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          : <div className='analitics__blocks-block personal'>
                                            <div className='analitics__block-top'>
                                              <h3 className='analitics__blocks-title'>
                                                <img src={
                                                            currentComand?.comandImg?.length != 0
                                                              ? `${process.env.REACT_APP_STATIC_PATH}/${currentComand.comandImg}`
                                                              : s1
                                                        }
                                                />
                                                Моя воронка продаж ({currentComand.title})
                                              </h3>
                                            </div>
                                            <div className='analitics__block-content'>
                                              <ul className='analitics__block-content-top personal'>
                                                <li>Воронка продаж</li>
                                                <li>
                                                  <span>Перешли</span>
                                                  <span>Отказы</span>
                                                </li>
                                                <li>Сделки</li>
                                                <li>Выполнено</li>
                                              </ul>
                                              {
                                                        stages.map(stage =>
                                                          <ul
                                                            key={stage._id}
                                                            className='analitics__block-content-stages personal'
                                                          >
                                                            <li>
                                                              {stage.title}
                                                            </li>
                                                            <li>
                                                              <span>
                                                                {           
                                                                            countMovementCard(
                                                                              carts.length,
                                                                              stage.cards
                                                                                .filter(c => c.comandId == currentComand._id)
                                                                                .filter(c => c.userId == user.id).length
                                                                            )
                                                                        }
                                                                %
                                                              </span>
                                                              <div className='slider'>
                                                                <div
                                                                  className='slider__back'
                                                                  style={
                                                                                {
                                                                                  width: `${countMovementCard(
                                                                                        carts.length,
                                                                                        stage.cards
                                                                                            .filter(c => c.comandId == currentComand._id)
                                                                                            .filter(c => c.userId == user.id)
                                                                                            .length
                                                                                    )}%`
                                                                                }
                                                                            }
                                                                />
                                                              </div>
                                                              <span>
                                                                {
                                                                            countPercent(
                                                                              notSuccessCarts
                                                                                .filter(card => card.stageId == stage._id)
                                                                                .length,
                                                                              stage
                                                                                .cards
                                                                                .filter(card =>
                                                                                  card.comandId == currentComand._id
                                                                                ).length
                                                                            )

                                                                        }
                                                                %
                                                              </span>
                                                            </li>
                                                            <li>
                                                              {
                                                                        carts.filter(card => card.stageId == stage._id).length
                                                                    }
                                                            </li>
                                                            <li>
                                                              {
                                                                        countPercent(
                                                                          successCarts
                                                                            .filter(card => card.stageId == stage._id)
                                                                            .length,
                                                                          stage
                                                                            .cards
                                                                            .filter(card =>
                                                                              card.comandId == currentComand._id
                                                                            ).length
                                                                        )

                                                                    }%
                                                            </li>
                                                          </ul>
                                                        )

                                                    }
                                            </div>
                                            </div>
                                    }

                                </>
                              : <AnaliticaResult selectedComand={selectedComand} />
                        }

                    </div>
            }

      <AnaliticaNotSuccessModal
        activeNotSuccessModal={activeNotSuccessModal}
        setActiveNotSuccessModal={setActiveNotSuccessModal}
      />
      <AnaliticaSuccessModal
        activeSuccessModal={activeSuccessModal}
        setActiveSuccessModal={setActiveSuccessModal}
      />
    </div>
  )
}

export default Analitica
