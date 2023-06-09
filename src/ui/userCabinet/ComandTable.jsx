import { pencil } from 'img'
import { s1 } from 'img/emojiesPack'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeAdmin } from 'redux/asyncRedux/UserAuthAsync'
import Alert from './Alert'
import ComandRow from './ComandRow'

function ComandTable (
  { comandList, openModalEditComand, workerList, openRoleSelect, currentWorkerId, selectRole, deleteWorkerFromComand, onMouseLeaveSelectRole, deleteWorker, roleTitleRef }
) {
  const dispatch = useDispatch()
  const id = useSelector(state => state.user.user.id)
  const [workerId,setWorker] = useState(null)
  const changeAd = async () => {
    console.log(workerId, id)
    await changeAdmin(dispatch, workerId, id)
    window.location.reload()
  }
  const [activeAlert,setAlert] = useState(false)
  return (
    <div className='comand__table'>
      <div className='comand__table-line'>
        <ul className='comand__table-items'>
          <li className='comand__table-item'>Ф.И.О</li>
          <li className='comand__table-item'>Доступ</li>
          <li className='comand__table-item'>Телефон</li>
          <li className='comand__table-item'>E-mail</li>
          <li className='comand__table-item' />
        </ul>
      </div>
      <div className='comand__table-content'>
        {
                    comandList?.map(cmd =>
                      <div key={cmd._id} className='comand__table-wrapper'>
                        <div className='comand__table-content-top'>
                          <div className='comand__table-content-top-title'>
                            <img
                              src={
                                        cmd.comandImg.length != 0
                                          ? `${process.env.REACT_APP_STATIC_PATH}/${cmd.comandImg}`
                                          : s1
                                    } alt=''
                            />
                            <h1>{cmd.title}</h1>
                          </div>
                          <img onClick={() => openModalEditComand(cmd._id)} src={pencil} alt='' />
                        </div>
                        {
                                workerList?.map(worker =>
                                  worker.comandId == cmd._id
                                    ? worker.isActivated
                                        ? <ComandRow
                                            setAlert = {setAlert}
                                            setWorker = {setWorker}
                                            key={worker._id}
                                            worker={worker}
                                            openRoleSelect={openRoleSelect}
                                            currentWorkerId={currentWorkerId}
                                            selectRole={selectRole}
                                            deleteWorkerFromComand={deleteWorkerFromComand}
                                            roleTitleRef={roleTitleRef}
                                            onMouseLeaveSelectRole={onMouseLeaveSelectRole}
                                          />
                                        : <div
                                            className='comand__worker-cancel'
                                            key={worker._id}
                                          >
                                          <span>отправлено приглашение</span>
                                          <div className='comand__worker-cancel-right'>
                                            <span>{worker.email}</span>
                                            <button
                                              onClick={() => deleteWorker(worker._id)}
                                            >Отменить приглашение
                                            </button>
                                          </div>
                                          </div>
                                    : null
                                )
                            }
                      </div>
                    )
                }
      </div>
      <Alert changeAd={changeAd} setAlert = {setAlert} active = {activeAlert}/>
    </div>
  )
}

export default ComandTable
