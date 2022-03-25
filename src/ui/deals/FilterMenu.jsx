import selectMenuItem from 'components/content/hooks/useSelectMenuItem'
import React, { useRef } from 'react'

function FilterMenu (confing) {
  const menuRef = useRef()

  const {
    setArrForCards,
    userAndComandCards,
    tasks,
    setIsTasksToday,
    checkBoxSortMenuStates
  } = confing

  const { sortCardMenu, showCardsWithTasks, showCardWitoutTasks, showAllCards, showOverdueCards } = selectMenuItem({
    menuRef,
    setArrForCards,
    userAndComandCards,
    tasks,
    setIsTasksToday
  })

  return (
    <div className='content__second-left'>
      <ul
        className='content__second-items'
        ref={menuRef}
        data-id='1'
        onClick={e => sortCardMenu(e)}
      >
        <li
          className='content__second-item blue-active active'
          data-id='1'
          data-type='menu__item'
          onClick={e => showAllCards(e)}
        >
          Все сделки
          <span>{checkBoxSortMenuStates.cardsLength}</span>
        </li>
        <li
          onClick={e => showCardsWithTasks(e)}
          className='content__second-item green-active'
          data-id='2'
          data-type='menu__item'
        >
          Задач на сегодня
          <span>{checkBoxSortMenuStates.cardsTasksLength}</span>
        </li>
        <li
          onClick={e => showCardWitoutTasks(e)}
          className='content__second-item orange-active'
          data-id='3'
          data-type='menu__item'
        >
          Без задач
          <span>{checkBoxSortMenuStates.cardsWithoutTasks}</span>
        </li>
        <li
          onClick={e => showOverdueCards(e)}
          className='content__second-item red-active'
          data-id='4'
          data-type='menu__item'
        >
          Просроченных
          <span>{checkBoxSortMenuStates.overdueCardsTasks}</span>
        </li>
      </ul>
    </div>
  )
}

export default FilterMenu
