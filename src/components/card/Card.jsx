import { formatDate, setDateSeconds } from 'functions/FormatDate'
import { useravatar2 } from 'img'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Card ({ card, stage, setIsLoading, setCurrentCard, setCurrentStage, cardRef, onClick, isTasksToday }) {
  const { workers } = useSelector(state => state.worker)

  const openCurrentCart = async (id, stgId) => {
    try {
      window.localStorage.setItem('linkCardId', id)
    } catch (error) {
      console.log('error', error)
    }
  }

  const values = [[90, '€'], [80, '$'], [1, '₽']]
  const currency = useSelector(state => state.user.user.currency)

  function dragOverHandler (e) {
    e.preventDefault()
  }

  function dragStartHandler (e, stage, card) {
    setCurrentCard(card._id)
    setCurrentStage(stage._id)
  }

  function showCardCornerUnitColor (task) {
    const tasks = task.filter(t => t.status === 'active')
    if (tasks.filter(t => setDateSeconds(t.date) < setDateSeconds(new Date())).length > 0 && !isTasksToday) {
      return 'red-day'
    }
    if (tasks.length) {
      return 'green-day'
    }
    return 'orange-day'
  }

  function showCardCornerUnit (task) {
    const tasks = task.filter(t => t.status === 'active')

    if (tasks.filter(t => setDateSeconds(t.date) < setDateSeconds(new Date())).length > 0 && !isTasksToday) {
      return `${tasks.filter(t => setDateSeconds(t.date) < setDateSeconds(new Date())).length} задачи`
    }

    const todayTasks = task.filter(t => new Date(t.date).toLocaleDateString() === new Date().toLocaleDateString() &&
      new Date(t.date).setSeconds(0, 0) >= new Date().setSeconds(0, 0))

    if (todayTasks.length > 0) {
      return `${todayTasks.length} задачи`
    }
    return 'без задач'
  }

  function showOwnResponsibleAvatar () {
    const responsibleAvatar = workers.find(item => item._id === card.userId)?.avatar
    const avatar = responsibleAvatar?.length > 0
      ? `${process.env.REACT_APP_STATIC_SERVER_PATH}/${responsibleAvatar}`
      : useravatar2
    return avatar
  }

  return (
    <Link key={card._id} to={`/card/${card._id}`}>
      <div
        onClick={() => openCurrentCart(card._id, stage._id)}
        style={{ marginBottom: '12px' }}
      >

        <div
          draggable
          onDragOver={e => dragOverHandler(e, card)}
          onDragStart={e => dragStartHandler(e, stage, card)}
                  // onClick={onClick}
          className='content__blocks-item'
          data-type='Card'
          ref={cardRef}
        >
          <div style={{ pointerEvents: 'none' }}>
            <div className='content__blocks-item-top'>
              <span className='content__blocks-item-title'>
                {card.title}
              </span>
              <span
                className={`content__blocks-item-day ${showCardCornerUnitColor(card.tasks)}`}
              >
                {showCardCornerUnit(card.tasks)}
              </span>
            </div>
            <span className='content__blocks-item-name'>
              <span>
                {card.name.length ? card.name : 'Имя контакта'}
              </span>
              <span>, {card.company.length ? card.company : 'Название компании'}</span>
            </span>
            <span className='content__blocks-item-price'>
              {card?.price ? `${Math.round(card?.price * 100 / currency ) / 100}` : 0} {(values?.filter(item => item[0] == currency)[0] && currency) ? values?.filter(item => item[0] == currency)[0][1] : '₽'}
            </span>
            <div className='content__blocks-item-bottom'>
              <div className='content__blocks-item-avatar'>
                <img src={showOwnResponsibleAvatar()} />
              </div>
              <div className='content__blocks-item-date'>
                {formatDate(card.createdAt)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Card
