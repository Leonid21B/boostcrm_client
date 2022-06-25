import React, { Fragment, useContext, useState, useRef } from 'react'
import { ContentStatesStore } from 'StoreStates'
import { closeGraySvg } from 'img'
import BlueBtn from 'ui/btns/BlueBtn'
import GrayBtn from 'ui/btns/GrayBtn'
import { useDispatch, useSelector } from 'react-redux'

import { removeCurrentStage } from 'redux/asyncRedux/CreateStage'
import { _getStages, _removeStage } from 'redux/redusers/StageReduser'
import CustomSingleSelect from 'ui/select/CustomSingleSelect'
import MainService from 'requests/service/mainService'
import { _getALLCarts } from 'redux/redusers/CartReduser'
import { _getComand } from 'redux/redusers/ComandOfSalesReduser'
import { _getInvitedWorker } from 'redux/redusers/WorkerReduser'
import { _getALLTask } from 'redux/redusers/NewTaskReduser'

import { v1 } from 'uuid'

function RemoveStageModal ({ data }) {
  const {
    currenrTitleStage,
    setCurrenrTitleStage
  } = useContext(ContentStatesStore)

  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)
  const { stages } = useSelector(state => state.newStages)
  const { carts } = useSelector(state => state.newCart)

  const [checked, setChecked] = useState(false)
  const [stageId, setStageId] = useState('')

  const singleSelectRef = useRef()

  const closeModal = () => {
    setCurrenrTitleStage(null)
  }

  const removeStageModal = async () => {
    const targetSatge = stages.find(item => item._id == data.id).cards?.length
    if (targetSatge == 0) {
      await removeCurrentStage(dispatch, data.id, user._id, '12345678ac910112bafad345')
      dispatch(_removeStage(stages.filter(stg => stg._id != data.id)))
    }

    if (stageId && checked) {
      closeModal()
      await removeCurrentStage(dispatch, data.id, user.id, stageId)
      const { cards, comands, stages, workers, tasks } =
                await MainService.getAllDealInfo({ userId: user.id }).then(data => data.data)
      dispatch(_getALLCarts(cards))
      dispatch(_getStages(stages))
      dispatch(_getComand(comands))
      dispatch(_getInvitedWorker(workers))
      dispatch(_getALLTask(tasks))
    }
  }

  return (
    <div className='modalWrapper' style={currenrTitleStage === data.id ? { display: 'block' } : null}>
      <div className='modalParandja'>
        <div className='modal w_434Up'>
          <div className='modalTopLine'>
            <h3 className='modalTopLine__title'>Удалить этап “ <span>{currenrTitleStage === data.id ? data.stage.title : ''}</span>”?</h3>
            <button onClick={closeModal} className='modalTopLine__title'>
              <img src={closeGraySvg} alt='' />
            </button>
          </div>
          {
                        carts.filter(card => card?.stageId == data.id).length != 0
                          ? <>
                            <p className='modalText w_350'>Перед тем как удалить этот этап, выберите куда переместить сделки</p>
                            <div className='removestage__madal-toggle'>
                              <label>
                                <input onClick={() => setChecked(!checked)} className='checkbox' type='checkbox' name='' id='' />
                                <span className='removestage__madal-toggleCustom' />
                                <span>Переместить сделки</span>
                              </label>

                              <div style={checked ? { display: 'block', marginTop: '16px' } : { display: 'none' }} className='transferto'>
                                <label htmlFor=''>Этап</label>
                                <CustomSingleSelect
                                  itemsForDropDown={stages}
                                  itemForView={stages.find(stg => stg._id == data.id)}
                                  sortId={data.id}
                                  whatToDo={setStageId}
                                  singleSelectRef={singleSelectRef}
                                  whereIsSelect='FROM_REMOVESTAGE'
                                  idType='1'
                                />
                              </div>

                            </div>
                          </>
                          : null
                    }

          <div className='modal__Btns'>
            <GrayBtn func={closeModal}>Отменить</GrayBtn>
            <BlueBtn func={removeStageModal}>Удалить</BlueBtn>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemoveStageModal
