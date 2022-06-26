import ForgotPassword from 'componentStore/modals/ForgotPassword'
import InviteWorker from 'componentStore/modals/InviteWorker'
import { activeItem, arrowdwn, emptyAvatar, loadAvatar, pencil, urn, useravatar2 } from 'img'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlueBtn from 'ui/btns/BlueBtn'
import '../../scss/userCabinet.scss'
import AddComanOfSale from 'componentStore/modals/AddComanOfSale'
import { deleteInvitedWorker } from 'redux/asyncRedux/WorkerAsync'
import { deleteUserAvatar, logOut, updateUser, uploadUserAvatar } from 'redux/asyncRedux/UserAuthAsync'
import { _getInvitedWorker } from 'redux/redusers/WorkerReduser'
import CustomSingleSelect from 'ui/select/CustomSingleSelect'
import AuthService from 'requests/service/AuthService'
import { _getComand, _getCurrentComand } from 'redux/redusers/ComandOfSalesReduser'
import MainService from 'requests/service/mainService'
import { _getUserInfo } from 'redux/redusers/UserReduser'
import { s1 } from 'img/emojiesPack'
import { useIMask } from 'react-imask'
import RemoveWorkerModal from 'componentStore/modals/RemoveWorkerModal'
import Loading from 'ui/loading/Loading'
import ComandRow from 'ui/userCabinet/ComandRow'
import ComandTable from 'ui/userCabinet/ComandTable'
import Alert from './Alert/Alert'
import ChooseCurrency from './ChooseCurrency/ChooseCurrency'

function UserCabinet() {
  const [activeModal, setActiveModal] = useState(false)
  const [isGetWorkersInfo, setIsGetWorkersInfo] = useState(false)
  const [active, setActive] = useState(false)
  const [activeAddComand, setActiveAddComand] = useState(false)

  const [stateAvatar, setStateAvatar] = useState('')

  const btnsRef = useRef()
  const loadInputRef = useRef()
  const avatarRef = useRef()
  const roleTitleRef = useRef()

  const accessLayerRef = useRef()
  const accessLayerComandRef = useRef()

  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)
  const { comands, currentComand } = useSelector(state => state.comand)
  const { workers } = useSelector(state => state.worker)

  const [fio, setFio] = useState(user?.fio)
  const [fioPlace, setFioPlace] = useState('')
  const [email, setEmail] = useState('')
  const [tel, setTel] = useState(user?.tel)
  const [company, setCompany] = useState('')

  const [workerList, setWorkerList] = useState(workers)
  const [comandList, setComandList] = useState(comands)

  const [isKeyUp, setIsKeyUp] = useState(false)

  const [errorInputTel, setErrorInputTel] = useState(false)

  const [showClearInputTextIcon, setShowClearInputTextIcon] = useState({
    fio: false,
    email: false,
    tel: false,
    company: false
  })

  const [isRedact, setIsRedact] = useState(false)

  const [accessLayerTitle, setAccessLayerTitle] = useState('Все уровни доступа')
  const [comnandsOFSaleTitle, setComnandsOFSaleTitle] = useState('Все команды продаж')

  const [isLoading, setIsLoading] = useState(false)

  const [workerId, setWorkerId] = useState('')
  const [workerName, setWorkerName] = useState('')

  const [activeRemoveWorkerModal, setActiveRemoveWorkerModal] = useState(false)

  const [isRoleSelected, setIsRoleSelected] = useState(false)

  const [currentWorkerId, setCurrentWorkerId] = useState('')

  const [telMask, setTelMask] = useState({ mask: '+{7} (000) 000 00 00' })
  const { ref, maskRef } = useIMask(telMask)

  const [fileLoadError, setFileLoadError] = useState(false)

  const [status, setStatus] = useState('non_active')

  const singleSelectRef = useRef()

  function activeHanlder() {
    setActiveModal(true)
  }
  useEffect(() => {
    if(user.fio){
      if(user.fio != fioPlace){
        setFioPlace(user.fio)
      }
    }
  },[user])
  function selectOtherMenu(e) {
    const { id } = e.target.dataset
    if (id != 1) {
      setIsGetWorkersInfo(true)
      btnsRef.current.querySelector('[data-id="1"]').classList.remove('active')
      if (!btnsRef.current.querySelector(`[data-id="${id}"]`).classList.contains('active')) {
        btnsRef.current.querySelector(`[data-id="${id}"]`).classList.add('active')
        return
      }
      return
    }
    setIsGetWorkersInfo(false)
    btnsRef.current.querySelector(`[data-id="${id}"]`).classList.add('active')
    btnsRef.current.querySelector('[data-id="2"]').classList.remove('active')
  }

  function setUserData(modelData) {
    setFioPlace(modelData.fio)
    setEmail(modelData.email)
    //setTel(modelData.tel)
    setCompany(modelData.company)
  }

  useEffect(() => {
    async function fetchdata() {
      if (localStorage.getItem('token')) {
        const { userData, comands, workers } =
          await MainService.getUserProfile({ userId: user?.id }).then(data => data.data)

        dispatch(_getUserInfo(userData))
        dispatch(_getComand(comands))
        dispatch(_getInvitedWorker(workers))

        setUserData(userData)
        setCompany(userData.company)
        setWorkerList(workers)
        setComandList(comands)

        return
      }
      logOut(dispatch)
    }
    fetchdata()
  }, [isGetWorkersInfo])

  useEffect(() => {
    setWorkerList(workers)
  }, [workers])

  useEffect(() => {
    setComandList(comands)
  }, [comands])

  function openModal() {
    setActive(true)
  }

  function openModalAddComand() {
    setActiveAddComand(true)
    document.getElementsByTagName('body')[0].style.overflowY = 'hidden'
  }

  async function openModalEditComand(id) {
    setIsRedact(true)
    localStorage.setItem('comandID', JSON.stringify(id))
    dispatch(_getCurrentComand(comands.find(c => c._id == id)))
    setActiveAddComand(true)
  }

  async function updateUserInfoHandlerKeyUp(e, type, field) {
    if (e.keyCode == 13 && user[field] != type && type.length != 0) {
      setShowClearInputTextIcon({ ...showClearInputTextIcon, [field]: false })
      if (type.length > 0) {
        setIsKeyUp(true)
        await updateUser(dispatch, fio, email, tel, company, user.id)
        e.target.blur()
        setIsKeyUp(false)
      }
    }
  }

  async function updateUserInfoHandlerOnBlur(e, type, field) {
    if (user[field] != type && type.length != 0) {
      setShowClearInputTextIcon({ ...showClearInputTextIcon, [field]: false })
      await updateUser(dispatch, fio, email, tel, company, user.id)
    }
  }

  async function deleteWorker(id) {
    deleteInvitedWorker(dispatch, id, null)
    dispatch(_getInvitedWorker(workers.filter(wrk => wrk._id != id)))
  }

  function deleteWorkerFromComand(id, name) {
    setWorkerId(id)
    setWorkerName(name)
    setActiveRemoveWorkerModal(true)
  }

  function updateUserComand(selectedComandId) {
    AuthService.updateUserComand(user?.id, selectedComandId)
  }

  function openDropDown(e) {
    if (e.target.dataset.type == 'users' || e.target.dataset.type == 'selectedUserItem') {
      accessLayerRef.current.classList.toggle('open')
    } else {
      accessLayerComandRef.current.classList.toggle('open')
    }
    if (e.target.dataset.value == 'selectedItem') {
      selectItem(e.target.dataset)
    }
  }

  function selectItem({ type, id }) {
    if (type == 'selectedUserItem') {
      if (!accessLayerRef.current.querySelector(`[data-id="${id}"]`).classList.contains('selected')) {
        accessLayerRef.current.querySelectorAll(`[data-type="${type}"]`).forEach(item => {
          item.classList.remove('selected')
        })
        accessLayerRef.current.querySelector(`[data-id="${id}"]`).classList.add('selected')
        if (id == 1) {
          setWorkerList(workers)
          setAccessLayerTitle('Все уровни доступа')
          return
        }
        if (id == 2) {
          setWorkerList(workers.filter(item => item.role == 'admin'))
          setAccessLayerTitle('Администратор')
          return
        }
        setWorkerList(workers.filter(item => item.role == 'user'))
        setAccessLayerTitle('Менеджер')
        return
      }
      return
    }
    if (!accessLayerComandRef.current.querySelector(`[data-id="${id}"]`).classList.contains('selected')) {
      accessLayerComandRef.current.querySelectorAll(`[data-type="${type}"]`).forEach(item => {
        item.classList.remove('selected')
      })
      accessLayerComandRef.current.querySelector(`[data-id="${id}"]`).classList.add('selected')
      if (id == 1) {
        setComandList(comands)
        setComnandsOFSaleTitle('Все команды продаж')
        return
      }
      setComandList(comands.filter(item => item._id == id))
      setComnandsOFSaleTitle(`${comands.find(item => item._id == id).title}`)
    }
  }

  async function uploadAvatar(e) {
    setStatus('orange_status_alert')
    const fileType = e.target.files[0].type
    const file = e.target.files[0] ?? false

    if (fileType != `image/${fileType.split('/').pop()}`) {
      return
    }
    if (!file) return

    if (Math.floor(file.size / 1024) > 5120) {
      setFileLoadError(true)
      return
    }
    setFileLoadError(false)
    setIsLoading(true)
    await uploadUserAvatar(dispatch, e.target.files[0], user?.id)
    setIsLoading(false)
    setStatus('green_status_alert')
  }

  function removeAvatar(e) {
    if (user?.avatar?.length != 0) {
      deleteUserAvatar(dispatch, user?.id)

      setStateAvatar('')
    }
  }

  function showIcon() {
    return () => {
      if (useravatar2.split('/').pop() != avatarRef.current.src.split('/').pop()) {
        setStateAvatar('delete')
        return
      }
      setStateAvatar('load')
    }
  }

  function hideIcon() {
    return () => {
      setStateAvatar('')
    }
  }

  const telRegx = /^\+([1-9]{1,2} \([0-9]{3}\) [0-9]{3} [0-9]{2} [0-9]{2})$/
  function inputChangeHandler(e, func, type) {
    func(e)
    if (type == 'tel') {
      if (!telRegx.test(String(e).toLowerCase())) {
        setErrorInputTel(true)
        return
      }
      setErrorInputTel(false)
    }
  }

  async function selectRole(e, workerId) {
    roleTitleRef.current.innerHTML = e.target.innerText
    setCurrentWorkerId('')

    const userProfileInfo = await AuthService.updateRole(user.id, workerId, e.target.dataset.id).then(uP => uP.data)
    dispatch(_getInvitedWorker(userProfileInfo.workers))
    dispatch(_getUserInfo(userProfileInfo.user))
  }
  function openRoleSelect(e, worker) {
    if (worker.role != 'admin' && worker._id != user?.id) {
      setCurrentWorkerId(worker._id)
      e.target.classList.toggle('active')
      setIsRoleSelected(!isRoleSelected)
      return
    }
    if (worker.role == 'admin' && workers.filter(w => w.role == 'admin').length > 1) {
      setCurrentWorkerId(worker._id)
      e.target.classList.toggle('active')
      setIsRoleSelected(!isRoleSelected)
    }
  }

  function onMouseLeaveSelectRole(e) {
    e.target.classList.remove('active')
    setCurrentWorkerId(null)
  }

  return (
    <div className='usercabinet'>
      <Alert status={status} setStatus={setStatus} />
      {
        isLoading
          ? <Loading />
          : <div className='container'>
            <div className={`alert__error ${fileLoadError ? 'active' : null}`}>
              <span> Слишком большой размер файла</span>
            </div>
            <div className='usercabinet__inner'>
              <h1 className={`usercabinet__title ${isGetWorkersInfo ? 'm1024' : null}`}>Информация</h1>

              <div className={`usercabinet__top-line ${isGetWorkersInfo ? 'm1024' : null}`}>
                <div className={`usercabinet__btns ${isGetWorkersInfo ? 'm1024' : null}`} ref={btnsRef}>
                  <button data-id='1' onClick={e => selectOtherMenu(e)} className='active'>Профиль</button>
                  {
                    user?.role == 'admin'
                      ? <button data-id='2' onClick={e => selectOtherMenu(e)} className=''>Сотрудники</button>
                      : null
                  }
                </div>
                <div
                  className='usercabinet__top-right'
                  style={isGetWorkersInfo ? { display: 'flex' } : { display: 'none' }}
                >
                  <div className='usercabinet__top-select'>

                    <div
                      onClick={openDropDown}
                      ref={accessLayerRef}
                      data-type='users'
                      className='select__accessLayer'
                      onMouseLeave={e => accessLayerRef.current.classList.remove('open')}
                    >
                      <div className='select__accessLayer-input'>
                        <span>{accessLayerTitle}</span>
                        <img src={arrowdwn} alt='' />
                      </div>
                      <div className='select__accessLayer-dropDown'>
                        <ul className='oVY'>
                          <li
                            data-type='selectedUserItem'
                            data-value='selectedItem'
                            data-id={1}
                            className='selectedItem selected'
                          >
                            <img className='customSelectedItemImg' src={activeItem} alt='' />
                            <span>
                              Все уровни доступа
                            </span>
                          </li>
                          <li
                            data-type='selectedUserItem'
                            data-value='selectedItem'
                            data-id={2}
                            className='selectedItem'
                          >
                            <img className='customSelectedItemImg' src={activeItem} alt='' />
                            Администратор
                          </li>
                          <li
                            data-type='selectedUserItem'
                            data-value='selectedItem'
                            data-id={3}
                            className='selectedItem'
                            style={{ borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px'}}
                          >
                            <img className='customSelectedItemImg' src={activeItem} alt='' />
                            Менеджер
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div
                      onClick={openDropDown}
                      ref={accessLayerComandRef}
                      data-type='comands'
                      className='select__accessLayer'
                      onMouseLeave={e => accessLayerComandRef.current.classList.remove('open')}
                    >
                      <div className='select__accessLayer-input'>
                        <span>{comnandsOFSaleTitle}</span>
                        <img src={arrowdwn} alt='' />
                      </div>
                      <div className='select__accessLayer-dropDown'>
                        <ul className='oVY'>
                          <li
                            data-type='selectedComandItem'
                            data-value='selectedItem'
                            data-id={1}
                            className='selectedItem selected'
                          >
                            <img className='customSelectedItemImg' src={activeItem} alt='' />
                            <span>
                              Все команды продаж
                            </span>
                          </li>
                          {
                            comands.map(item =>
                              <li
                                key={item._id}
                                data-type='selectedComandItem'
                                data-value='selectedItem'
                                data-id={item._id}
                                className='selectedItem'
                              >
                                <img
                                  className='customSelectedItemImg'
                                  src={activeItem}
                                  alt=''
                                />
                                <span>
                                  {item.title}
                                </span>
                              </li>
                            )
                          }
                        </ul>
                      </div>
                    </div>

                  </div>
                  <div className='usercabinet__top-right-btns'>
                    <button onClick={openModalAddComand}>Создать команду продаж</button>
                    <BlueBtn func={openModal}>Добавить сотрудника</BlueBtn>
                  </div>
                </div>
              </div>

              {
                isGetWorkersInfo
                  ? <ComandTable
                    comandList={comandList}
                    openModalEditComand={openModalEditComand}
                    workerList={workerList}
                    openRoleSelect={openRoleSelect}
                    currentWorkerId={currentWorkerId}
                    selectRole={selectRole}
                    deleteWorkerFromComand={deleteWorkerFromComand}
                    onMouseLeaveSelectRole={onMouseLeaveSelectRole}
                    deleteWorker={deleteWorker}
                    roleTitleRef={roleTitleRef}
                  />
                  : <div className='usercabinet__content'>
                    <div className='usercabinet__left'>
                      <h2>Личные данные</h2>
                      <div className='usercabinet__left-content'>

                        <div className='usercabinet__left-first'>
                          <div
                            className={`usercabinet__left-avatar ${stateAvatar}`}
                            onMouseOver={showIcon()}
                            onMouseLeave={hideIcon()}
                          >
                            <label className='usercabinet__left-labelavatar'>
                              <div className='usercabinet__left-avatar-img'>
                                <img
                                  ref={avatarRef}
                                  src={
                                    user?.avatar?.length != 0
                                      ? `${process.env.REACT_APP_STATIC_SERVER_PATH}/${user?.avatar}`
                                      : useravatar2
                                  } alt=''
                                />
                              </div>
                              <input
                                onChange={e => uploadAvatar(e)}
                                ref={loadInputRef}
                                className='usercabinet__left-avatar-upload'
                                type='file'
                                name=''
                                id=''
                                accept='image/*'
                              />
                              <div className='usercabinet__left-avatar-remove'>
                                <label>
                                  <img onClick={e => removeAvatar(e)} src={urn} alt='' />
                                </label>
                              </div>
                              <div className='usercabinet__left-avatar-load'>
                                <img src={loadAvatar} alt='' />
                              </div>
                            </label>
                          </div>
                          <div className='usercabinet__left-name'>
                            <label>Ф.И.О</label>
                            <div className='usercabinet__left-name-input'>
                              <input
                                type='text'
                                placeholder={'Дуайт Шрут'}
                                value={fio}
                                onBlur={e => updateUserInfoHandlerOnBlur(e, fio, 'fio')}
                                onKeyUp={e => updateUserInfoHandlerKeyUp(e, fio, 'fio')}
                                onChange={e => inputChangeHandler(e.target.value, setFio, 'fio')}
                                maxLength={20}
                              />
                            </div>
                          </div>
                        </div>
                        <label>E-mail</label>
                        <div className='usercabinet__left-email-input email'>
                          <input
                            type='email'
                            placeholder='schrute__top@dundermifflin.com'
                            value={email}
                            onBlur={e => updateUserInfoHandlerOnBlur(e, email, 'email')}
                            onKeyUp={e => updateUserInfoHandlerKeyUp(e, email, 'email')}
                            onChange={e => inputChangeHandler(e.target.value, setEmail, 'email')}
                            maxLength={40}
                          />
                        </div>

                        <label>Телефон</label>
                        <div className={`usercabinet__left-tel-input phone ${errorInputTel ? 'errorTelInput' : null}`}>
                          <input
                            ref={ref}
                            type='tel'
                            placeholder='+7 (937) 123 45 67'
                            value={tel}
                            onBlur={e => updateUserInfoHandlerOnBlur(e, tel, 'tel')}
                            onKeyUp={e => updateUserInfoHandlerKeyUp(e, tel, 'tel')}
                            onChange={e => inputChangeHandler(e.target.value, setTel, 'tel')}
                          />
                        </div>
                        <div>
                          <label>Пароль</label>
                          <button onClick={activeHanlder}>Редактировать пароль</button>
                        </div>
                      </div>
                    </div>
                    <div className='usercabinet__right'>
                      <h2>О компании</h2>
                      <label>Название компании</label>
                      <div className='usercabinet__right-company-input company'>
                        <input
                          disabled={user?.role != 'admin'}
                          style={user?.role != 'admin' ? { backgroundColor: '#F7F8FA', color: '#C1C5D6' } : null}
                          type='text'
                          value={company}
                          onBlur={e => updateUserInfoHandlerOnBlur(e, company, 'company')}
                          onKeyUp={e => updateUserInfoHandlerKeyUp(e, company, 'company')}
                          onChange={e => inputChangeHandler(e.target.value, setCompany, 'company')}
                          maxLength={40}
                          placeholder='ООО Дандер Миффлин'
                        />
                      </div>

                      <label htmlFor=''>Команда</label>
                      {
                        user?.role != 'admin'
                          ? <input
                            disabled={user?.role != 'admin'}

                            style={user?.role != 'admin'
                              ? { backgroundColor: '#F7F8FA', color: '#C1C5D6', userSelect: 'none' }
                              : null}

                            type='text'
                            value={comands?.filter(cmd => cmd._id == user?.comandId)[0]?.title ?? ''}
                            onChange={e => []}
                          />
                          : <CustomSingleSelect
                            itemsForDropDown={comands}
                            itemForView={comands.find(cmd => cmd._id == user?.comandId)}
                            sortId={user?.comandId}
                            whatToDo={updateUserComand}
                            singleSelectRef={singleSelectRef}
                            whereIsSelect='FROM_PROFILE'
                            idType='1'
                          />

                      }

                      <label htmlFor=''> Доступ на редактирование</label>
                      <input
                        disabled
                        style={{ backgroundColor: '#F7F8FA', color: '#C1C5D6' }}
                        type='text'
                        placeholder='Менеджер'
                        value={user?.role == 'admin' ? 'Администратор' : 'Менеджер'}
                        onChange={e => []}
                      />
                      <label htmlFor=''>Валюта</label>
                      <ChooseCurrency />
                    </div>
                  </div>
              }

            </div>
          </div>
      }

      <ForgotPassword active={activeModal} setActive={setActiveModal} />
      {
        user?.role == 'admin'
          ? <>
            <InviteWorker active={active} setActive={setActive} />
            <AddComanOfSale
              active={activeAddComand}
              setActive={setActiveAddComand}
              isRedact={isRedact}
              setIsRedact={setIsRedact}
              workers={workerList}
            />
            {
              activeRemoveWorkerModal
                ? <RemoveWorkerModal
                  active={activeRemoveWorkerModal}
                  setActive={setActiveRemoveWorkerModal}
                  name={workerName}
                  id={workerId}
                />
                : null
            }
          </>
          : null
      }

    </div>
  )
}

export default UserCabinet
