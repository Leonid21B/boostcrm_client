import React, { Fragment, useEffect, useRef, useState, useContext } from 'react'
import { arrowdwn, emptyAvatar, activeItem, closeGray } from 'img'

import { ContentStatesStore } from 'StoreStates'

function SelectWorkers (
  { workers, selectedWorker, setSelectedWorker, whatToDo, isForUpdate, singleSelectRef, multiSelectRef, whereIsSelect }
) {
  // const ref = useRef()

  const { checkClickOnSomeOfSelect } = useContext(ContentStatesStore)
  const [workersList, setWorkersList] = useState(workers)

  function openDropDown (e) {
    // console.log('multiSelectRef', multiSelectRef);
    if (workersList.length) {
      if (whereIsSelect === 'FROM_CARD') {
        checkClickOnSomeOfSelect('SINGLE', singleSelectRef.current)
      }
      multiSelectRef.current.classList.toggle('open')
      // console.log('multiSelectRef', multiSelectRef);
      // multiSingleRef.current.classList.add('open')
      // console.log('multi', multiSingleRef.current.classList);
      // e.target.classList.toggle('open')
      if (e.target.dataset.type === 'selectedItem') {
        selecItem(e.target.dataset)
      }
    }
  }

  function selecItem ({ type, id }) {
    if (!multiSelectRef.current.querySelector(`[data-id="${id}"]`).classList.contains('selected')) {
      multiSelectRef.current.querySelector(`[data-id="${id}"]`).classList.add('selected')
      setSelectedWorker(prev => [...selectedWorker, workers.filter(wkr => wkr._id === id)[0]])
      if (isForUpdate) {
        whatToDo(workers.filter(wkr => wkr._id === id)[0], 'ADD_WORKER')
      }
    }
  }

  function removeComandFromList (id) {
    setSelectedWorker(prev => selectedWorker.filter(wrk => wrk._id !== id))
    if (workersList.length) {
      multiSelectRef.current.querySelector(`[data-id="${id}"]`)?.classList.remove('selected')
      if (isForUpdate) {
        const user = { _id: id }
        whatToDo(user, 'REMOVE_WORKER')
      }
    }
  }

  // console.log('selectedworkers', selectedWorker)

  return (
    <>

      <div
        className='select__workers customSelect'
        data-type='input'
        onClick={e => openDropDown(e)}
        ref={multiSelectRef}
      >

        <div
          className='selectInput'
        >
          <span className='customSelectTitle'>Выберите сотрудника</span>
          <img className='customSelectImg' src={arrowdwn} alt='' />
        </div>

        <div className='selectDropDown'>
          <ul>
            {
                            workers?.map(worker =>
                              <li
                                key={worker._id}
                                className={
                                        selectedWorker?.filter(item => item._id === worker._id).length >= 1
                                          ? 'selectedItem selected'
                                          : 'selectedItem'
                                    }
                                data-type='selectedItem'
                                data-id={worker._id}
                              >
                                <img className='customSelectedItemImg' src={activeItem} alt='' />
                                <span className='customSelectedItemTitle'>{worker.fio}</span>
                              </li>
                            )
                        }
          </ul>
        </div>
      </div>

      <div className='palceForListOfWorkers'>
        <ul>
          {
            // TODO: Check why is selectedWorker sometimes empty?
            selectedWorker && selectedWorker.length &&
            selectedWorker.filter(item => item)
              .map(wrkr =>
                <li key={wrkr._id} className='palceForListOfWorkersItem'>
                  <div className='palceForListOfWorkersItemInfo'>
                    <div className='palceForListOfWorkersItemImg'>
                      <img
                        src={
                          wrkr.avatar?.length
                            ? `${process.env.REACT_APP_STATIC_SERVER_PATH}/${wrkr.avatar}`
                            : emptyAvatar
                      } alt=''
                      />
                    </div>
                    <div className='palceForListOfWorkersItemInfoWrapper'>
                      <span className='palceForListOfWorkersItemName'>{wrkr.fio}</span>
                      <span className='palceForListOfWorkersItemEmail'>{wrkr.email}</span>
                    </div>
                  </div>
                  {
                        selectedWorker.length > 1
                          ? <img onClick={() => removeComandFromList(wrkr._id)} src={closeGray} alt='' />
                          : null
                    }
                </li>
              )
          }
        </ul>
      </div>
    </>
  )
}

export default SelectWorkers
