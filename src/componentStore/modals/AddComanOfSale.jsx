import { closeGraySvg } from 'img'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { cretateComandOfSale, updateComandOfSale } from 'redux/asyncRedux/ComandOfSale'
import BlueBtn from 'ui/btns/BlueBtn'
import GrayBtn from 'ui/btns/GrayBtn'
import SelectWorkers from 'ui/select/SelectWorkers'

import '../../scss/addcomandofsale.scss'
import '../../scss/commonStyle.scss'
import 'scss/commonStyleOfModal.scss'
import SelectStageImg from 'ui/dropDown/SelectStageImg'
import { s1 } from 'img/emojiesPack'
import { _getComand } from 'redux/redusers/ComandOfSalesReduser'
import { _getInvitedWorker } from 'redux/redusers/WorkerReduser'
import RemoveComandModal from './RemoveComandModal'
import { _getUserInfo } from 'redux/redusers/UserReduser'

function AddComanOfSale ({ active, setActive, children, isRedact = false, setIsRedact }) {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)
  const { workers } = useSelector(state => state.worker)
  const { comands, currentComand } = useSelector(state => state.comand)

  const [title, setTitle] = useState('')
  const [selectedWorker, setSelectedWorker] = useState([])

  const stageImg = useRef()
  const multiSelectRef = useRef()

  const [activeStageImg, setActiveStageImg] = useState(s1)

  const [errorInputState, setErrorInputState] = useState(false)
  const [activeRemoveComandModal, setActiveRemoveComandModal] = useState(false)

  async function createComandOfSale () {
    if (title.length > 0) {
      setActive()
      setErrorInputState(false)

      const img = stageImg.current.src.split('/').pop()
      !isRedact
        ? await cretateComandOfSale(dispatch, title, user.id, JSON.stringify(selectedWorker.map(wrk => wrk._id)), img)
        : await updateComandOfSale(
          dispatch, JSON.parse(localStorage.getItem('comandID')),
          title, selectedWorker.map(item => item._id), user.id, img
        )

      document.getElementsByTagName('body')[0].style.overflowY = 'auto'
      resetTitleAndWorkers()
      return
    }
    setErrorInputState(true)
  }

  useEffect(() => {
    setTitle(isRedact ? currentComand.title : '')
    setSelectedWorker(isRedact ? currentComand.users : [])
  }, [isRedact])

  const [activeSetStageImg, setActiveSetStageImg] = useState(false)

  function resetTitleAndWorkers () {
    setTitle('')
    setSelectedWorker([])
    setIsRedact(false)
    setActiveStageImg(s1)
  }

  function inputChangeHandler (e, func) {
    func(e.value)
    if (e.value.length > 0) {
      e.classList.remove('inputError')
      setErrorInputState(false)
      return
    }
    e.classList.add('inputError')
    setErrorInputState(true)
  }

  function cancelHandler () {
    return () => {
      setIsRedact(false)
      setActive()
      setTitle('')
      setSelectedWorker([])
      document.getElementsByTagName('body')[0].style.overflowY = 'auto'
    }
  }

  function delComandOfSale () {
    setActive()
    setActiveRemoveComandModal(true)
  }

  function onMouseLeave () {
    setActiveSetStageImg(false)
  }

  if (activeRemoveComandModal) {
    return (
      <RemoveComandModal
        setARCM={setActiveRemoveComandModal}
        title={currentComand.title}
        workers={currentComand.users}
        id={currentComand._id}
        setTitle={setTitle}
        setSelectedWorker={setSelectedWorker}
        setIsRedact={setIsRedact}
      />
    )
  }

  return (
    <div className='addcomanodsale' style={active ? { display: 'block' } : null}>
      <div className='modalParandja'>
        <div className='modal w_400Up'>
          <div className='modalTopLine'>
            <h1 className='modalTopLine__title'>
              {
                                isRedact
                                  ? 'Редактировать команду'
                                  : 'Новая команда'
                            }
            </h1>
            <img className='modalTopLine__close' onClick={cancelHandler()} src={closeGraySvg} alt='' />
          </div>
          <p className='modalText'>Создавая несколько команд вы можете сравнивать их между собой.</p>

          <label className='modal__Label'>Название команды</label>
          <div
            className='addcomanodsale__modal-input title selectImgParent'
            style={errorInputState ? { marginBottom: '8px' } : null}
            onMouseLeave={onMouseLeave}
          >
            <input
              type='text'
              value={title}
              onChange={(e) => inputChangeHandler(e.target, setTitle)}
              style={errorInputState ? { borderColor: '#FF4D4D' } : null}
              maxLength={50}
            />
            <img
              ref={stageImg}
              onClick={() => setActiveSetStageImg(!activeSetStageImg)}
              src={activeStageImg} alt=''
            />
            <SelectStageImg
              activeSetStageImg={activeSetStageImg}
              setActiveSetStageImg={setActiveSetStageImg}
              stageImg={stageImg}
              setActiveStageImg={setActiveStageImg}
            />
          </div>
          <p
            className='addcomanodsale__modal-input-error'
            style={errorInputState ? { display: 'block' } : null}
          >Заполните поле
          </p>

          <label className='modal__Label' htmlFor=''>Сотрудники</label>

          <SelectWorkers
            workers={workers}
            selectedWorker={selectedWorker}
            setSelectedWorker={setSelectedWorker}
            multiSelectRef={multiSelectRef}
            whereIsSelect='FROM_COMAND'
          />
          <div className={`modal__Btns addcomanodsale__modal-btns ${isRedact ? 'btns' : null} `}>
            {
                            isRedact
                              ? <>
                                <div>
                                  <button
                                    onClick={delComandOfSale}
                                  >Удалить
                                  </button>
                                </div>
                                <div>
                                  <GrayBtn func={cancelHandler()}>Отменить</GrayBtn>
                                  <BlueBtn func={createComandOfSale}>Создать</BlueBtn>
                                </div>
                              </>
                              : <>
                                <GrayBtn func={cancelHandler()}>Отменить</GrayBtn>
                                <BlueBtn func={createComandOfSale}>Создать</BlueBtn>
                              </>
                        }
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddComanOfSale
