import { closeGraySvg, smile, urn } from 'img'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { updateComandOfSale } from 'redux/asyncRedux/ComandOfSale'
import { _getComand } from 'redux/redusers/ComandOfSalesReduser'
import BlueBtn from 'ui/btns/BlueBtn'
import GrayBtn from 'ui/btns/GrayBtn'
import SelectWorkers from 'ui/select/SelectWorkers'
import '../../scss/addcomandofsale.scss'
import 'scss/commonStyleOfModal.scss'
import RemoveComandModal from './RemoveComandModal'
import MainService from 'requests/service/mainService'
import { _getInvitedWorker } from 'redux/redusers/WorkerReduser'

function EditComanOfSale ({ active, setActive, children, id }) {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)
  const { workers } = useSelector(state => state.worker)
  const { comands, currentComand } = useSelector(state => state.comand)

  const [title, setTitle] = useState(currentComand.title)
  const [comandWorkers, setComandWorkers] = useState(currentComand?.users)

  const [activeRemoveComandModal, setActiveRemoveComandModal] = useState(false)

  const [selectedWorker, setSelectedWorker] = useState(currentComand?.users != null ? currentComand.users : [])

  const comandRef = useRef()

  async function updateCurrentComandOfSale () {
    setActive(false)
    await updateComandOfSale(
      dispatch, JSON.parse(localStorage.getItem('comandID')),
      title, selectedWorker.map(item => item._id), user.id
    )
    const { comands, workers } =
            await MainService.getUserProfile({ userId: user.id }).then(data => data.data)
    dispatch(_getComand(comands))
    dispatch(_getInvitedWorker(workers))
  }

  useEffect(() => {
    setTitle(currentComand.title)
    setComandWorkers(currentComand.users)
    setSelectedWorker(currentComand.users)
  }, [currentComand])

  function delComandOfSale () {
    setActive(false)
    setActiveRemoveComandModal(true)
  }

  if (activeRemoveComandModal) {
    return (
      <RemoveComandModal
        setARCM={setActiveRemoveComandModal}
        title={title}
        workers={comandWorkers}
        id={currentComand._id}
      />
    )
  }

  return (
    <div className='modalWrapper' style={active ? { display: 'block' } : null}>
      <div className='modalParandja'>
        <div className='modal w_400Up'>
          <div className='modalTopLine'>
            <h1 className='modalTopLine__title'>Редактировать команду</h1>
            <img className='modalTopLine__close' onClick={() => setActive(false)} src={closeGraySvg} alt='' />
          </div>
          <p className='modalText'>Создавая несколько команд вы можете сравнивать их между собой.</p>

          <label className='modal__Label'>Название команды</label>
          <div className='addcomanodsale__modal-input title'>
            <input
              type='text'
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <img src={smile} alt='' />
          </div>

          <label className='modal__Label' htmlFor=''>Сотрудники</label>
          <div className='addcomanodsale__modal-input worker'>
            <SelectWorkers
              comandRef={comandRef}
              workers={workers}
              selectedWorker={selectedWorker}
              setSelectedWorker={setSelectedWorker}
            />
          </div>
          <div className='addcomanodsale__modal-btns btns'>
            <div>
              <img src={urn} alt='' />
              <button onClick={delComandOfSale}>Удалить</button>
            </div>
            <div>
              <GrayBtn func={() => setActive(false)}>Отменить</GrayBtn>
              <BlueBtn func={updateCurrentComandOfSale}>Обновить</BlueBtn>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default EditComanOfSale
