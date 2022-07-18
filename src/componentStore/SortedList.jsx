import sortCards from 'functions/sortCards'
import { activeItem, arrowdwn, emptyAvatar, smile, useravatar2 } from 'img'
import { s1 } from 'img/emojiesPack'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { _getALLCarts, _getNotSuccessCart, _getOverdueCards } from 'redux/redusers/CartReduser'
import { _getComand } from 'redux/redusers/ComandOfSalesReduser'
import { _getALLTask } from 'redux/redusers/NewTaskReduser'
import { _getStages } from 'redux/redusers/StageReduser'
import { _getUserInfo } from 'redux/redusers/UserReduser'
import { _getInvitedWorker } from 'redux/redusers/WorkerReduser'
import MainService from 'requests/service/mainService'
import './moduleScss/sortedList.scss'

function SortedList (data) {
  const {
    setArrForCards, setUserAndComandCards, checkBoxSortMenuStates, setCheckBoxSortMenuStates, setContentLoading
  } = data

  const selectMenu = useRef()
  const selectWorkersRef = useRef()
  const selectComandsRef = useRef()

  const dispatch = useDispatch()

  const { workers } = useSelector(state => state.worker)
  const { comands, comandTitle } = useSelector(state => state.comand)
  // const { carts } = useSelector(state => state.newCart)
  const { user, userTitle } = useSelector(state => state.user)

  const [workresList, setWorkresList] = useState(workers)
  const [comandsList, setComandsList] = useState(comands)

  const [anyWorkerTitle, setAnyWorkerTitle] = useState('Любой ответственный')
  const [anyComandTitle, setAnyComandTitle] = useState('Любая команда прадаж')

  useEffect(() => {
    setWorkresList(workers)
  }, [workers])

  useEffect(() => {
    setComandsList(comands)
  }, [comands])

  function openDropDown (e) {
    const targetPressedSelect = e.target.dataset
    if (targetPressedSelect.type == 'sortWorkers') {
      selectWorkersRef.current.classList.toggle('open')
      return
    }
    if (e.target.dataset.type == 'sortComands') {
      selectComandsRef.current.classList.toggle('open')
    }
    if (e.target.dataset.value == 'selectedItem') {
      const typeOfRef = targetPressedSelect.type == 'selectedUserItem'
        ? selectWorkersRef.current
        : selectComandsRef.current

      selectItem({ ...targetPressedSelect, typeOfRef: typeOfRef })
    }
  }

  async function selectItem ({ type, id, typeOfRef }) {
    const wichType = type == 'selectedUserItem'

    if (!typeOfRef.querySelector(`[data-id="${id}"]`).classList.contains('selected')) {
      typeOfRef.querySelectorAll(`[data-type="${type}"]`).forEach(item => {
        item.classList.remove('selected')
      })

      const checkTypeOfSelect = wichType
        ? { ref: selectComandsRef.current, dataType: 'selectedComandItem' }
        : { ref: selectWorkersRef.current, dataType: 'selectedUserItem' }

      checkTypeOfSelect.ref.querySelectorAll(`[data-type="${checkTypeOfSelect.dataType}"]`)
        .forEach(item => {
          item.classList.remove('selected')
        })

      wichType ? setAnyComandTitle('Любая команда продаж') : setAnyWorkerTitle('Любой ответсвенный')

      typeOfRef.querySelector(`[data-id="${id}"]`).classList.add('selected')
      typeOfRef.classList.toggle('open')

      if (id != 1) {
        const data = wichType
          ? await MainService.getCurrentUserCards({ userId: id }).then(data => data.data)
          : await MainService.getCurrentComandCards({ comandId: id }).then(data => data.data)

        const { cards, tasks, noTasks, overdueCards } = data

        setArrForCards(sortCards(cards))
        setUserAndComandCards(cards)

        const actions = wichType
          ? [
              { type: 'SET_USERID', payload: id },
              { type: 'SET_USER_TITLE', payload: workresList.find(item => item._id == id).fio },
              { type: 'SET_COMAND_ID', payload: null },
              { type: 'SET_COMAND_TITLE', payload: 'Любая команда продаж' }
            ]
          : [
              { type: 'SET_COMAND_ID', payload: id },
              { type: 'SET_COMAND_TITLE', payload: comandsList.find(item => item._id == id).title },
              { type: 'SET_USERID', payload: null },
              { type: 'SET_USER_TITLE', payload: 'Любой ответсвенный' }
            ]

        actions.forEach(action => {
          dispatch(action)
        })

        setCheckBoxSortMenuStates({
          ...checkBoxSortMenuStates,
          cardsLength: cards.length,
          cardsTasksLength: tasks
            .filter(t => new Date(t.date).toLocaleDateString() == new Date().toLocaleDateString() &&
                            new Date(t.date).setSeconds(0, 0) >= new Date().setSeconds(0, 0)
            ).length,
          cardsWithoutTasks: noTasks.length,
          overdueCardsTasks: overdueCards.length
        })

        dispatch(_getOverdueCards(overdueCards))

        return
      }

      wichType ? setAnyWorkerTitle('Любой ответственный') : setAnyComandTitle('Любая команда продаж')

      dispatch({ type: 'SET_USERID', payload: null })
      dispatch({ type: 'SET_USER_TITLE', payload: 'Любой ответсвенный' })

      dispatch({ type: 'SET_COMAND_ID', payload: null })
      dispatch({ type: 'SET_COMAND_TITLE', payload: 'Любая команда продаж' })

      const { cards, comands, stages, tasks, overdueCards, userData } =
                await MainService.getAllDealInfo({ userId: user.id }).then(data => data.data)

      dispatch(_getUserInfo(userData))
      dispatch(_getALLCarts(cards))
      dispatch(_getStages(stages))
      dispatch(_getComand(comands))
      dispatch(_getALLTask(tasks))

      setArrForCards(sortCards(cards))
      setUserAndComandCards(cards)

      setCheckBoxSortMenuStates({
        ...checkBoxSortMenuStates,
        cardsLength: cards.length,
        cardsTasksLength: tasks
          .filter(t => new Date(t.date).toLocaleDateString() == new Date().toLocaleDateString() &&
                        new Date(t.date).setSeconds(0, 0) >= new Date().setSeconds(0, 0)
          ).length,
        cardsWithoutTasks: cards.filter(cart => cart.tasks?.length == 0).length,
        overdueCardsTasks: overdueCards && overdueCards.length
      })

      dispatch(_getOverdueCards(overdueCards || []))
    }
  }

  return (
    <div className='sortList' ref={selectMenu}>
      <div className='sort'>

        <div
          className='selectWorkers'
          data-type='sortWorkers'
          ref={selectWorkersRef}
          onMouseLeave={e => selectWorkersRef.current.classList.remove('open')}
          onClick={e => openDropDown(e)}
        >
          <span className='sort__input'>{userTitle?.length == 0 ? 'Любой ответственный' : userTitle}</span>

          <div className='dropDown' data-type='sortWorkersdp'>
            <ul className='dropDown__items-workers'>
              <li
                className='selectedItem dropDwn-item'
                data-type='selectedUserItem'
                data-value='selectedItem'
                data-id={1}
              >
                <img className='customSelectedItemImg' src={activeItem} alt='' />
                <span className='name'>Любой ответственный</span>
              </li>
              { workresList.filter(it => it?._id)?.map(worker =>
                                  <li
                                    key={worker._id}
                                    className='selectedItem dropDwn-item'
                                    data-type='selectedUserItem'
                                    data-value='selectedItem'
                                    data-id={worker._id}
                                  >
                                    <img className='customSelectedItemImg' src={activeItem} alt='' />
                                    <div className='selectWorkers-img'>
                                      <img
                                        src={
                                                worker.avatar?.length != 0
                                                  ? `${process.env.REACT_APP_STATIC_SERVER_PATH}/${worker.avatar}`
                                                  : useravatar2
                                            } alt=''
                                      />
                                    </div>
                                    <span className='name'>{worker?.fio}</span>
                                  </li>
                                )
                            }
            </ul>
          </div>
        </div>

        <div
          className='sortDiferentcommand'
          data-type='sortComands'
          ref={selectComandsRef}
          onMouseLeave={e => selectComandsRef.current.classList.remove('open')}
          onClick={e => openDropDown(e)}
        >
          <span className='sort__input'>{comandTitle?.length == 0 ? 'Любая команда продаж' : comandTitle}</span>
          <div className='dropDown' data-type='sortComandsdp'>
            <ul className='dropDown__items-comands'>
              <li
                className='selectedItem dropDwn-item'
                data-type='selectedComandItem'
                data-value='selectedItem'
                data-id={1}
              >
                <img className='customSelectedItemImg' src={activeItem} alt='' />
                <span className='name'>Любая команда продаж</span>
              </li>
              {
                                comandsList.map(comand =>
                                  <li
                                    key={comand._id}
                                    className='selectedItem dropDwn-item'
                                    data-type='selectedComandItem'
                                    data-value='selectedItem'
                                    data-id={comand._id}
                                  >
                                    <img className='customSelectedItemImg' src={activeItem} alt='' />
                                    <img
                                      src={
                                            comand.comandImg?.length != 0
                                              ? `${process.env.REACT_APP_STATIC_PATH}/${comand.comandImg}`
                                              : s1
                                        } alt=''
                                    />
                                    <span className='name'>{comand?.title}</span>
                                  </li>
                                )
                            }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortedList
