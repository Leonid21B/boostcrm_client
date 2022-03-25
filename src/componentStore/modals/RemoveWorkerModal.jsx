import { closeGraySvg } from 'img'
import React, { useRef, Fragment, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { deleteInvitedWorker } from 'redux/asyncRedux/WorkerAsync'
import BlueBtn from 'ui/btns/BlueBtn'
import GrayBtn from 'ui/btns/GrayBtn'
import CustomSingleSelect from 'ui/select/CustomSingleSelect'

function RemoveWorkerModal ({ active, setActive, name, id }) {
  const [checked, setChecked] = useState(false)

  const { workers } = useSelector(state => state.worker)
  const [workerId, setWorkerId] = useState('')
  const dispatch = useDispatch()

  const singleSelectRef = useRef()

  function closeModal () {
    setChecked(false)
    setActive(false)
  }

  async function removeWorker () {
    if (workerId && checked && workerId != id && workers.find(w => w._id == id).role == 'user') {
      await deleteInvitedWorker(dispatch, id, workerId)
      closeModal()
      return
    }
    if (workerId && checked && workerId != id && workers.filter(w => w.role == 'admin').length > 1) {
      await deleteInvitedWorker(dispatch, id, workerId)
      closeModal()
    }
  }

  return (
    <div
      className='modalWrapper'
      style={active ? { display: 'block' } : null}
    >
      <div className='modalParandja'>
        <div className='modal w_434Up'>
          <div className='modalTopLine'>
            <h3 className='modalTopLine__title'>Удалить работника“ <span>
              {name}
            </span>”?
            </h3>
            <button onClick={closeModal} className='modalTopLine__title'>
              <img src={closeGraySvg} alt='' />
            </button>
          </div>
          {
                        workers.length != 0
                          ? <>

                            <p className='modalText w_350'>
                              Перед тем как удалить этого работника, выберите куда переместить его сделки
                            </p>
                            <div className='removestage__madal-toggle'>
                              <label>
                                <input
                                  onClick={() => setChecked(!checked)}
                                  className='checkbox'
                                  type='checkbox'
                                />
                                <span className='removestage__madal-toggleCustom' />
                                <span>Переместить сделки</span>
                              </label>

                              <div
                                style={checked ? { display: 'block', marginTop: '16px' } : { display: 'none' }} className='transferto'
                              >
                                <label htmlFor=''>Работники</label>
                                <CustomSingleSelect
                                  itemsForDropDown={workers.filter(w => w.isActivated == true)}
                                  itemForView={
                                                workers.find(w => w._id == id)?.fio
                                            }
                                  sortId={id}
                                  whatToDo={setWorkerId}
                                  singleSelectRef={singleSelectRef}
                                  whereIsSelect='FROM_REMOVEWORKER'
                                  idType='2'
                                />
                              </div>

                            </div>
                          </>
                          : null
                    }

          <div className='modal__Btns'>
            <GrayBtn func={closeModal}>Отменить</GrayBtn>
            <BlueBtn func={removeWorker}>Удалить</BlueBtn>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemoveWorkerModal
