import { emptyAvatar, urn } from 'img'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeAdmin } from 'redux/asyncRedux/UserAuthAsync'
import top from './img/top.svg' 

function ComandRow (
  { setWorker,setAlert, worker, openRoleSelect, currentWorkerId, selectRole, deleteWorkerFromComand, roleTitleRef, onMouseLeaveSelectRole }) {
  const changeAd = (id) => {
    setWorker(id)
    setAlert(true)
  }
  return (
    <ul key={worker._id} className='comand__table-content-items'>
      <li className='comand__table-content-item'>
        <div className='comand__table-content-item-img'>
          <img
            src={
                        worker.avatar.length != 0
                          ? `${process.env.REACT_APP_STATIC_SERVER_PATH}/${worker.avatar}`
                          : emptyAvatar
                    } alt=''
          />
        </div>
        <span>{worker?.fio}</span>
      </li>
      <li
        className='comand__table-content-item'
        onClick={e => openRoleSelect(e, worker)}
        onMouseLeave={onMouseLeaveSelectRole}
      >
        {
                    currentWorkerId == worker._id
                      ? <span ref={roleTitleRef}>
                        {
                                worker.role
                            }
                        </span>
                      : <span>
                        {
                                worker.role
                            }
                      </span>
                }

        <div
          className='comand__table-content-item-select'
          style={
                        currentWorkerId == worker._id
                          ? { display: 'block' }
                          : null
                    }
        >
          <span
            className='selectedItem'
            onClick={e => selectRole(e, worker._id)}
            data-id={1}
          >
            Админ
          </span>
          <span
            className='selectedItem'
            onClick={e => selectRole(e, worker._id)}
            data-id={2}
          >
            Пользователь
          </span>
        </div>
      </li>
      <li className='comand__table-content-item'>
        <span>
          {worker?.role == 'admin' ? '***************' : worker?.tel}
        </span>
      </li>
      <li className='comand__table-content-item'>
        <span>
          {
                        worker?.role == 'admin' ? '***************' : worker?.email
                    }
        </span>
      </li>
      <div className="img_cont_row" style={{display:'flex', width: '50px', paddingLeft:'auto'}}>
        <img src={top} className={worker.role === 'user' ? 'rebuild_class' : 'non_active'} onClick = {() => changeAd(worker._id)}/>
        <img
          onClick={e => deleteWorkerFromComand(
            worker._id, worker.fio
          )}
          src={urn}
          alt=''
        />
      </div>
    </ul>
  )
}

export default ComandRow
