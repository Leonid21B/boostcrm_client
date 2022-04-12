import CloseTask from 'componentStore/modals/CloseTask'
import { formatDateDay, formatTime, setDateSeconds } from 'functions/FormatDate'
import { emptyAvatar, greenbird, pencil } from 'img'
import React, { Fragment, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { closeCardTask } from 'redux/asyncRedux/CartTasks'
import { _getCurrentCartTask } from 'redux/redusers/NewTaskReduser'

function BottomTasksView ({ tasksRef, setAddNenTask, setIsUpdateTask, tasks,scrollTasks}) {
  const { currentCart } = useSelector(state => state.newCart)
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const existOfTasks = tasks?.filter(task => task.status == 'active').length == 0
  const tasksLength = currentCart?.tasks?.length > 4

  const [showWorkers, setShowWorkers] = useState(false)

  function showTasksReponsibleAvatars (task) {
    const userAvatar = task?.workers[0]?.avatar
    const result = userAvatar?.length != 0 ? `${process.env.REACT_APP_STATIC_SERVER_PATH}/${userAvatar}` : emptyAvatar
    return result
  }

  function showWorkersHandler () {
    return () => {
      setShowWorkers(!showWorkers)
    }
  }

  function checkCardsResponsible (card) {
    const u = card?.workers?.find(w => w._id == user.id)
    return u
  }

  function closeCurrentTask (id) {
    return async () => {
      await closeCardTask(dispatch, id, user.id, currentCart._id)
    }
  }

  function updateTaskHandler (id) {
    
    return () => {
      dispatch(_getCurrentCartTask(currentCart.tasks.find(item => item._id == id)))
      setAddNenTask(true)
      setIsUpdateTask(true)
    }
  }

  return (
    <div
      className={`currentcart__content-bottom-wrapepr ${existOfTasks ? null : 'active'}`}
      style={tasksLength ? { overflowX: 'hidden' } : { overflowX: 'inherit' }}
      ref={tasksRef}
    >

      {
                currentCart?.tasks
                  ?.filter(task => task.status == 'active')
                  .map(task =>
                    <div
                      key={task._id}
                      className={`currentcart__bottom-task ${setDateSeconds(task.date) < setDateSeconds(new Date()) ? 'overdue' : null}`}
                    >
                      <div className='currentcart__bottom-task-left'>
                        <span>
                          {formatTime(task.createdAt)}
                        </span>
                        <p>{task.title}</p>
                        <span>{formatDateDay(task.date)} после {task.time}</span>
                      </div>
                      <div className='currentcart__bottom-task-rigth'>
                        <div className='currentcart__bottom-task-person'>
                          <div>
                            <div className='currentcart__bottom-task-person-img'>
                              <img
                                src={
                                                    showTasksReponsibleAvatars(task)
                                                } alt=''
                              />
                            </div>
                            <span>
                              {
                                                    task?.workers[0]?.fio
                                                }
                            </span>
                          </div>
                          {
                                        task.workers.length > 1
                                          ? <div
                                              className='currentcart__bottom-task-number'
                                              onClick={showWorkersHandler()}
                                            >
                                            <span>+{task.workers.length}</span>
                                            </div>
                                          : null
                                    }

                        </div>
                        {
                                    checkCardsResponsible(currentCart)
                                      ? <>
                                        <img
                                          onClick={closeCurrentTask(task._id)}
                                          src={greenbird} alt=''
                                        />
                                        <img
                                          onClick={updateTaskHandler(task._id)}
                                          src={pencil}
                                          alt=''
                                        />
                                      </>
                                      : null
                                }

                        {
                                    task?.workers.length > 1
                                      ? <div
                                          className='currentcart__bottom-task-workers'
                                          style={showWorkers ? { display: 'block' } : null}
                                        >
                                        <ul>
                                          {
                                                    task.workers?.map(item =>
                                                      <li
                                                        key={item._id}
                                                        className='currentcart__bottom-task-worker'
                                                      >
                                                        <img
                                                          src={
                                                                item?.avatar?.length != 0
                                                                  ? item.avatar
                                                                  : emptyAvatar
                                                            } alt=''
                                                        />
                                                        {item.fio}
                                                      </li>
                                                    )
                                                }
                                        </ul>
                                        </div>
                                      : null
                                }

                      </div>

                    </div>
                  )
            }
    </div>
  )
}

export default BottomTasksView
