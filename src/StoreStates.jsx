import React, { createContext, useState, useEffect, useRef } from 'react'
import CurrentCart from 'pages/current/CurrentCart'
import SideMenu from './components/sideMenu/SideMenu'
import Content from 'components/content/Content'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import Clients from 'pages/Clients'
import CurrentClient from 'pages/current/CurrentClient'
import Analitica from 'pages/Analitica'
import Tarif from 'pages/Tarif'
import { useSelector, useDispatch } from 'react-redux'
import PopupLink from './PopupLink/PopupLink'
import { _getALLCarts, _getCartId } from 'redux/redusers/CartReduser'
import HomePage from 'pages/home/src/components/home/HomePage'
import UserCabinet from 'pages/userCabinet/UserCabinet'
import Loader from 'react-loader-spinner'
import License from 'pages/home/src/components/home/licensePage/License'
import Policy from 'pages/home/src/components/home/policyPage/Policy'

import { _getStages } from 'redux/redusers/StageReduser'
import { _getComand } from 'redux/redusers/ComandOfSalesReduser'
import { _getInvitedWorker } from 'redux/redusers/WorkerReduser'
import { _getALLTask } from 'redux/redusers/NewTaskReduser'
import HelpModal from 'componentStore/modals/HelpModal'
import UserAgreement from 'pages/home/src/components/home/agreement/UserAgreement'
import { getCompany } from 'redux/asyncRedux/ClientsAsync'

export const ContentStatesStore = createContext({})

function StoreStates () {
  const [activeItem, setActiveItem] = useState(0)
  const [currenrTitleStage, setCurrenrTitleStage] = useState(null)
  const [activePopup,setPopup] = useState(false)
  const { isAuth, user } = useSelector(state => state.user)
  const [newStageActive, setNewStageActive] = useState(false)
  const [openHelpModal, setOpenHelpModal] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const [importedClientsFile, setImportedClientsFile] = useState(null)
  const { paymentDate } = useSelector(state => state.companySpace)

  const removeStage = async (id) => {
    setCurrenrTitleStage(id)
  }

  const singleRef = useRef()
  const multiSelectRef = useRef()
  function checkClickOnSomeOfSelect (typeOfSelect, refOfselect) {
    console.log({
      typeOfSelect,
      refOfselect
    })
    // if(typeOfSelect == 'SINGLE'){
    //     refOfselect.current.classList.remove('open')
    //     return
    // }
    // refOfselect.current.classList.remove('open')

    typeOfSelect == 'SINGLE' ? refOfselect.classList.remove('open') : refOfselect.classList.remove('open')
  }

  const states = {
    activeItem,
    setActiveItem,
    currenrTitleStage,
    setCurrenrTitleStage,
    newStageActive,
    setNewStageActive,
    removeStage,
    isLoading,
    setIsLoading,
    setIsLoaded,
    openHelpModal,
    setOpenHelpModal,
    importedClientsFile,
    setImportedClientsFile,
    checkClickOnSomeOfSelect,
    singleRef,
    multiSelectRef
  }

  if (!isAuth) {
    return (
      <Switch>
        <ContentStatesStore.Provider value={states}>
          {
                    !isLoaded
                      ? <Route path='/' exact> <HomePage setPopup = {setPopup} activePopup = {activePopup}/></Route>
                      : <div
                          style={
                                { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }
                            }
                        >
                        <Loader
                          type='Rings'
                          color='#73AAFC'
                          height={100}
                          width={100}
                        />
                      </div>
                }
          <Route path='/license' exact><License /></Route>
          <Route path='/popup' exact><PopupLink setPopup = {setPopup}/> </Route>
          <Route path='/policy' exact><Policy /></Route>
          <Route path='/userAgreement' exact><UserAgreement /></Route>
          <Redirect to='/' exact />
        </ContentStatesStore.Provider>
      </Switch>
    )
  }

  // const d = new Date(paymentDate)

  // if (d < new Date().setSeconds(0, 0)) {
  //     return (
  //         <ContentStatesStore.Provider value={ states }>
  //             <React.Fragment>
  //                 <SideMenu />
  //                 <Switch>
  //                     <Route path='/tarif' exact>
  //                         <Tarif />
  //                     </Route>
  //                     <Redirect to='/tarif' exact />
  //                 </Switch>
  //                 <HelpModal />
  //             </React.Fragment>
  //         </ContentStatesStore.Provider>
  //     )
  // }

  return (
    <Switch>
      <>
        <ContentStatesStore.Provider value={states}>
          <SideMenu />
          <>
            {
                                isLoading
                                  ? <div
                                      style={
                                            { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }
                                        }
                                    >
                                    <Loader
                                      type='Rings'
                                      color='#73AAFC'
                                      height={100}
                                      width={100}
                                    />
                                  </div>
                                  : <Route path={`/card/${localStorage.getItem('linkCardId')}`} exact>
                                    <CurrentCart isClientCreateCard={false} />
                                  </Route>
                            }

            <Route path='/' exact>
              <Content />
            </Route>
            <Route path='/clients' exact>
              <Clients />
            </Route>
            {
                                isLoading
                                  ? <div
                                      style={
                                            { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }
                                        }
                                    >
                                    <Loader
                                      type='Rings'
                                      color='#73AAFC'
                                      height={100}
                                      width={100}
                                    />
                                  </div>
                                  : <Route path='/client/:id' exact>
                                    <CurrentClient />
                                  </Route>
                            }
            <Route path='/analitics' exact>
              <Analitica />
            </Route>
            {
                                user?.role == 'admin'
                                  ? <Route path='/tarif' exact>
                                    <Tarif />
                                  </Route>
                                  : null
                            }
            {
                                isLoading
                                  ? <div
                                      style={
                                            { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }
                                        }
                                    >
                                    <Loader
                                      type='Rings'
                                      color='#73AAFC'
                                      height={100}
                                      width={100}
                                    />
                                  </div>
                                  : <Route path='/user' exact>
                                    <UserCabinet />
                                  </Route>
                            }

          </>
          <HelpModal />
        </ContentStatesStore.Provider>
      </>
    </Switch>

  )
}

export default withRouter(StoreStates)
