import { emptyAvatar, urn } from 'img'
import React from 'react'

function ComandRow (
  { worker, openRoleSelect, currentWorkerId, selectRole, deleteWorkerFromComand, roleTitleRef, onMouseLeaveSelectRole }) {
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
      <img
        onClick={e => deleteWorkerFromComand(
          worker._id, worker.fio
        )}
        src={urn}
        alt=''
      />
    </ul>
  )
}

export default ComandRow
