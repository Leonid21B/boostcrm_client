import { closeGraySvg } from 'img'
import React, { Fragment, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { deleteComandOfSale } from 'redux/asyncRedux/ComandOfSale'
import { _getComand } from 'redux/redusers/ComandOfSalesReduser'
import { _getUserInfo } from 'redux/redusers/UserReduser'
import { _getInvitedWorker } from 'redux/redusers/WorkerReduser'
import BlueBtn from 'ui/btns/BlueBtn'
import GrayBtn from 'ui/btns/GrayBtn'
import CustomSingleSelect from 'ui/select/CustomSingleSelect'

function RemoveComandModal ({ setARCM, title, workers, id, setTitle, setSelectedWorker, setIsRedact }) {
  const [active, setActive] = useState(true)

  const [comandId, setComandId] = useState('')
  const [checked, setChecked] = useState(false)

  const { comands } = useSelector(state => state.comand)
  const { user } = useSelector(state => state.user)

  const dispatch = useDispatch()

  const singleSelectRef = useRef()

  function closeModal () {
    setActive(false)
    setARCM(false)
    document.getElementsByTagName('body')[0].style.overflowY = 'auto'
    setIsRedact(false)
  }

  async function removeComandModal () {
    if (workers.length == 0) {
      deleteComandOfSale(dispatch, id, user.id, id)
      dispatch(_getComand(comands.filter(cmd => cmd._id != id)))
      closeModal()
      return
    }
    if (comandId && checked && comandId != id) {
      deleteComandOfSale(dispatch, id, user.id, comandId)
      dispatch(_getComand(comands.filter(cmd => cmd._id != id)))
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
            {/* <h3 className="modalTopLine__title">Удалить команду “ <span>{ title }</span>”?</h3> */}
            <h3 className='modalTopLine__title'>Удалить команду “{title}”?</h3>
            <button onClick={closeModal} className='modalTopLine__close'>
              <img src={closeGraySvg} alt='' />
            </button>
          </div>
          {
                        workers.length != 0
                          ? <>

                            <p className='modalText w_350'>Перед тем как удалить эту команду, выберите куда переместить сотрудников</p>
                            <div className='removestage__madal-toggle'>
                              <label>
                                <input
                                  onClick={() => setChecked(!checked)}
                                  className='checkbox'
                                  type='checkbox'
                                />
                                <span className='removestage__madal-toggleCustom' />
                                <span>Переместить сотрудников</span>
                              </label>

                              <div
                                style={checked ? { display: 'block', marginTop: '16px' } : { display: 'none' }} className='transferto'
                              >
                                <label htmlFor=''>Этап</label>
                                <CustomSingleSelect
                                  itemsForDropDown={comands}
                                  itemForView={comands.filter(cmd => cmd._id == id)[0]}
                                  sortId={id}
                                  whatToDo={setComandId}
                                  singleSelectRef={singleSelectRef}
                                  whereIsSelect='FROM_REMOVECOMAND'
                                  idType='1'
                                />
                              </div>

                            </div>
                          </>
                          : null
                    }

          <div className='modal__Btns'>
            <GrayBtn func={closeModal}>Отменить</GrayBtn>
            <BlueBtn func={removeComandModal}>Удалить</BlueBtn>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemoveComandModal
