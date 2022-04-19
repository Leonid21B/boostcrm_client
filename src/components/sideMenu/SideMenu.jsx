import React, { useContext, useEffect, useRef, useState } from 'react'
import 'scss/sidemenu.scss'
import { emptyAvatar } from 'img/index'
import { Link, useHistory } from 'react-router-dom'
import { logOut } from 'redux/asyncRedux/UserAuthAsync'
import { useDispatch, useSelector } from 'react-redux'

import { ContentStatesStore } from 'StoreStates'
import ExitCrm from 'componentStore/modals/ExitCrm'
import { useNavigate, useParams } from 'react-router'

function SideMenu () {
  const params = useHistory()
  useEffect(() => {
    console.log(params)
    if (params.location.pathname != '/tarif' && (takenSpace + 100 >= space * 1024 && takenSpace && space /*|| nowTime >= -3*/)){
      console.log(params.location.pathname)
      const loc = `${document.location.href.slice(0, document.location.href.indexOf(params.location.pathname))}/tarif`
      document.location.replace(loc)
    }
  },[document.location.href])
  const dispatch = useDispatch()
  const [activePopup,setPopup] = useState('non_popup')
  const { user } = useSelector(state => state.user)
  const { openHelpModal, setOpenHelpModal } = useContext(ContentStatesStore)
  const { overdueCards } = useSelector(state => state.newCart)
  const { workers } = useSelector(state => state.worker)
  const { space, takenSpace, paymentDate } = useSelector(state => state.companySpace)
  let nowTime = (new Date() - new Date(paymentDate)) / (60 * 60 * 24 * 1000)
  useEffect(() => {
    nowTime = (new Date() - new Date(paymentDate)) / (60 * 60 * 24 * 1000)
  },[paymentDate])
  console.log( new Date(paymentDate).getDate())
  const menu = useRef()
  const history = useHistory()

  const logout = async () => {
    logOut(dispatch)
  }

  function openModal () {
    setOpenHelpModal(true)
  }

  function select (e) {
    if (!e.target.classList.contains('active') && e.target.dataset.type !== 'notSelect') {
      menu.current.querySelectorAll('a').forEach(e => { e.classList.remove('active') })
      e.target.classList.add('active')
    }
  }
  
  // function showUsersDelayTasks(tasks) {
  //     // const tasksResponsible = tasks.filter(t => workers.find(w => t.workers[0]._id === w._id))
  //     // console.log('tasksResponsible', tasksResponsible)
  //     // tasks.filter(t =>)
  //     console.log('tasks', tasks)
  // }

  // useEffect(() => {
  //     showUsersDelayTasks(overdueCards)
  // }, [])

  // function checkLocationPath(path) {
  //     const localtionPath = history.location.pathname
  //     console.log(locatp);
  //     switch (localtionPath) {
  //         case '/':
  //             const active = 'active'
  //             return active
  //         default:
  //             return null
  //     }
  // }

  // useEffect(() => {
  //     checkLocationPath('/')
  // }, [])

  return (
    <div className='menu'>

      <Link to='/user' draggable={false}>
        <div className={`menu__avatar ${history.location.pathname === '/user' ? 'active' : null}`}>
          <img
            src={
              user?.avatar ? `${process.env.REACT_APP_STATIC_SERVER_PATH}/${user.avatar}` : emptyAvatar
            } className='menu__img' draggable={false}
          />
        </div>
      </Link>

      <ul className='menu__nav' onClick={e => select(e)} ref={menu}>
        <>
          <li className='menu__nav-item'>
            <Link
              className={`${history.location.pathname === '/' ||
                                    history.location.pathname === `/card/${window.localStorage.getItem('linkCardId')}`
                                    ? 'active'
: null}`}
              to='/'
              draggable={false}
            >
              <div className=''>
                <div className='menu__nav-talk'>
                  <span className='talk'>Сделки</span>
                </div>
                {
                  overdueCards?.length > 0
                    ? <div className='menu__nav-toolTip'>
                      <span>
                        {overdueCards.filter(o => workers.find(w => w._id === o.userId)).length}
                      </span>
                    </div>
                    : null
                }
                <div className='menu__nav-item-svg1' />
              </div>
            </Link>
          </li>
          <li className='menu__nav-item'>
            <Link
              className={
                                    `${history.location.pathname === '/clients' ||
                                        history.location.pathname === `/client/${JSON.parse(window.localStorage.getItem('currentClientId'))}`
                                        ? 'active'
                                        : null}`
                                }
              to='/clients'
              draggable={false}
            >
              <div className=''>
                <div className='menu__nav-talk'>
                  <span className='talk'>Клиенты</span>
                </div>
                <div className='menu__nav-item-svg2' />
              </div>
            </Link>
          </li>
          <li className='menu__nav-item'>
            <Link
              className={`${history.location.pathname === '/analitics' ? 'active' : null}`}
              to='/analitics'
              draggable={false}
            >
              
              <div className=''>
                <div className='menu__nav-talk'>
                  <span className='talk'>Аналитика</span>
                </div>
                <div className='menu__nav-item-svg3' />
              </div>
            </Link>
          </li>
          {
            user?.role === 'admin'
              ? <li className='menu__nav-item'>
                <Link
                  className={`${history.location.pathname === '/tarif' ? 'active' : null}`}
                  to='/tarif'
                  draggable={false}
                >
                  <p className={takenSpace + 100 >= space * 1024 || nowTime >= -3 ? 'active_error_end' : 'non_active'}>!</p>
                  <div className=''>
                    <div className='menu__nav-talk'>
                      <span className='talk'>Тарифы</span>
                    </div>
                    <div className='menu__nav-item-svg4' />
                  </div>
                </Link>
              </li>
              : null
          }

          <li
            onClick={openModal}
            data-type='notSelect'
            className={`menu__nav-item ${openHelpModal ? 'active' : null}`}
          >
            <div className='menu__nav-talk'>
              <span className='talk'>Написать нам</span>
            </div>
            <div className='menu__nav-item-svg5' />
          </li>
        </>
      </ul>
      
        <div className='menu__exit'>
          <button onClick={() => setPopup('container_exit')} className='menu__exit-btn'>
            <div className='menu__nav-talk'>
              <span className='talk'>Выход</span>
            </div>
            <div className='menu__nav-item-svg6' />
          </button>
        </div>
      <ExitCrm setPopup = {setPopup} logout = {logout} activePopup ={activePopup}/>
    </div>
  )
}

export default SideMenu
