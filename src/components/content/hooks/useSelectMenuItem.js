import { useRef } from 'react'

export default function selectMenuItem (config) {
  const {
    menuRef,
    setArrForCards,
    userAndComandCards,
    setIsTasksToday,
    tasks
  } = config

  function sortCardMenu (e) {
    if (!e.target.classList.contains('active')) {
      menuRef.current.querySelectorAll('[data-type="menu__item"]')
        .forEach(item => { item.classList.remove('active') })

      e.target.classList.add('active')
    }
  }

  function showAllCards (e) {
    if (!e.target.classList.contains('active')) {
      setArrForCards(userAndComandCards)
    }
    setIsTasksToday(false)
  }

  function showCardsWithTasks (e) {
    if (!e.target.classList.contains('active')) {
      setArrForCards(
        userAndComandCards.filter(card => tasks
          .filter(t => new Date(t.date).toLocaleDateString() == new Date().toLocaleDateString() &&
                        new Date(t.date).setSeconds(0, 0) >= new Date().setSeconds(0, 0)
          )
          .find(x => card._id == x.cardId)
        )
      )
      setIsTasksToday(true)
    }
  }

  function showCardWitoutTasks (e) {
    if (!e.target.classList.contains('active')) {
      setArrForCards(userAndComandCards.filter(card => tasks.filter(x => x.cardId == card._id).length == 0))
    }
  }

  function showOverdueCards (e) {
    if (!e.target.classList.contains('active')) {
      setArrForCards(
        userAndComandCards
          .filter(card => tasks
            .filter(task => new Date(task.date).setSeconds(0, 0) < new Date().setSeconds(0, 0))
            .find(task => card._id == task.cardId)
          )
      )
      setIsTasksToday(false)
    }
  }

  return {
    sortCardMenu, showAllCards, showCardsWithTasks, showCardWitoutTasks, showOverdueCards
  }
}
