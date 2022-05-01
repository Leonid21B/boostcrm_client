import React, { useState, memo, useEffect, useRef } from 'react'
import { closeGraySvg } from 'img'
import BlueBtn from 'ui/btns/BlueBtn'
import GrayBtn from 'ui/btns/GrayBtn'
import { useDispatch, useSelector } from 'react-redux'

import { createTask, deletTask, updateCardTask } from 'redux/asyncRedux/CartTasks'
import SelectWorkers from 'ui/select/SelectWorkers'
import '../../scss/commonStyleOfModal.scss'

import { parseToLocalDateFormat } from 'functions/DateUtils'
import { EN_CA } from 'functions/Locale'

function NewTask({ addNenTask, setAddNenTask, isUpdateTask, setIsUpdateTask, tasks, setTasks, logRef, innerLogScroll, innerTasksScroll }) {
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.user)
  const { workers } = useSelector(state => state.worker)

  const { currentCart } = useSelector(state => state.newCart)
  const { currentTask } = useSelector(state => state.newTask)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const [selectedWorker, setSelectedWorker] = useState([])

  const [errorInputState, setErrorInputState] = useState({
    titleError: false,
    dateError: false,
    timeError: false
  })

  const multiSelectRef = useRef()

  let splitDate = null
  let splitTime = null

  async function createOrUpdate() {
    splitDate = date.split('-').join('').length
    splitTime = time.split(':').join('').length

    if (title.length > 0 && splitDate == 8 && splitTime == 4) {
      const d = new Date(`${date},${time}`).getTime()
     
      if (!isUpdateTask) {
        setErrorInputState({ ...errorInputState, titleError: false, dateError: false, timeError: false })
        closeModal()

        await createTask(dispatch, {
          title,
          description,
          date: d,
          time,
          id: currentCart?._id,
          userId: user.id,
          workers: selectedWorker[0] != undefined && selectedWorker?.map(item => item._id)
        })

        innerLogScroll()
        innerTasksScroll()
        return
      }
      await updateCardTask(dispatch, currentTask._id, title, description, d, time, selectedWorker, user.id)
      setAddNenTask(false)
      closeModal()
      logRef.current.scrollTop = logRef.current.scrollHeight
      return
    }

    if (title.length == 0 && date.length == 0 && time.length == 0) {
      setErrorInputState({ ...errorInputState, titleError: true, dateError: true, timeError: true })
      return
    }
    if (title.length == 0) {
      setErrorInputState({ ...errorInputState, titleError: true })
      return
    }
    if (date.length == 0) {
      setErrorInputState({ ...errorInputState, dateError: true })
      return
    }
    if (time.length == 0) {
      setErrorInputState({ ...errorInputState, timeError: true })
    }
  }

  useEffect(() => {
    if (isUpdateTask) {
      console.log('currentTask', currentTask)
      console.log('workers', currentTask.workers)
      setTitle(currentTask.title)
      setDescription(currentTask.description)

      const f = parseToLocalDateFormat(currentTask.date, EN_CA)
      setDate(f)

      setTime(currentTask.time)
      setSelectedWorker(currentTask.workers)

      return
    }
    setTitle('')
    setDescription('')
    setDate('')
    setTime('')
    setSelectedWorker([workers.find(w => w._id == user.id)])
  }, [isUpdateTask])

  async function remove() {
    setTasks(tasks.filter(t => t._id != currentTask._id))
    deletTask(dispatch, currentTask._id, currentTask.cardId)
    closeModal()
  }

  function closeModal() {
    setAddNenTask(false)
    document.getElementsByTagName('body')[0].style.overflowY = 'scroll'
    setSelectedWorker([workers.find(w => w._id == user.id)])
    setDescription('')
    setDate('')
    setTime('')
    setTitle('')
    setIsUpdateTask(false)
  }

  function inputChangeHandler(chosenValue, setChosenValue, typeOfError) {
    console.log(chosenValue.target.value)
    if (chosenValue.target.value.split('-')[0].length > 4 ){
      setChosenValue(chosenValue.target.value.slice(1, chosenValue.target.value.length()))
    }else{
      setChosenValue(chosenValue.target.value)
    }
    const hasError = chosenValue.length <= 0
    setErrorInputState({ ...errorInputState, [typeOfError]: hasError })
  }

  return (
    <div className='newtask' style={addNenTask ? { display: 'block' } : null}>
      <div className='modalParandja'>
        <div className='modal w_400Up'>
          <div className='modalTopLine mb_24'>
            <h3 className='modalTopLine__title'>
              {
                isUpdateTask
                  ? 'Редактировать задачу'
                  : 'Новая задача'
              }
            </h3>
            <button onClick={closeModal} className='newtask__modal-close'>
              <img className='modalTopLine__close' src={closeGraySvg} alt='' />
            </button>
          </div>
          <div className='newtask__modal-inputs'>
            <form onSubmit={e => e.preventDefault()}>
              <label className='modal__Label' htmlFor='nametask'>Название</label>

              <input
                className={`modal__Input ${errorInputState.titleError ? 'errorTitleInput' : null}  `}
                type='text' name='nametask' value={title}
                onChange={e => inputChangeHandler(e, setTitle, 'titleError')}
                autoComplete='off'
                maxLength={50}
              />
              <p
                className='newtask__modal-input-error'
                style={errorInputState.titleError ? { display: 'block' } : null}
              >Заполните поле
              </p>

              <label className='modal__Label' htmlFor='datetask'>Срок выполнения</label>
              <div className='newtask__modal-date'>
                <input
                  className={`modal__Input ${errorInputState.dateError ? 'errorDateInput' : null}`}
                  type='date'
                  name='datetask'
                  value={date}
                  max="9999-12-31"
                  autoComplete='off'
                  onChange={e => inputChangeHandler(e, setDate, 'dateError')}
                />

                <input
                  className={`modal__Input ${errorInputState.timeError ? 'errorTimeInput' : null}`}
                  type='time'
                  name='timetask'
                  value={time}
                  onChange={e => inputChangeHandler(e, setTime, 'timeError')}
                  autoComplete='off'
                />
              </div>

              <label className='modal__Label' htmlFor='step'>Ответственный</label>

              <SelectWorkers
                workers={workers}
                selectedWorker={selectedWorker}
                setSelectedWorker={setSelectedWorker}
                multiSelectRef={multiSelectRef}
                whereIsSelect='FROM_TASK'
              />

              <div className={`newtask__modal-btns ${isUpdateTask ? null : 'modal__Btns'} `}>
                {
                  isUpdateTask
                    ? <GrayBtn func={remove}>Удалить</GrayBtn>
                    : null
                }
                <div className='newtask__modal-buttons'>
                  <GrayBtn func={closeModal}>Отменить</GrayBtn>
                  {
                    isUpdateTask
                      ? <BlueBtn func={createOrUpdate}>Обновить</BlueBtn>
                      : <BlueBtn func={createOrUpdate}>Создать</BlueBtn>
                  }
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(NewTask)
