import React, { useEffect } from 'react'
import Header from './header/Header'
import '../../Styles/mainScreen.scss'
import MainScreen from './mainScreen/MainScreen'
import WhyCrm from './whyCrm/WhyCrm'
import '../../Styles/MainStyle.scss'
import CRMfree from './crmFree/CRMfree'
import ShowDemo from './showDemo/ShowDemo'
import Footer from './footer/Footer'
import { useDispatch } from 'react-redux'
import { _getALLCarts } from 'redux/redusers/CartReduser'
import { _getComand, _removeComandFromList, _setComandToList } from 'redux/redusers/ComandOfSalesReduser'
import { _getStages } from 'redux/redusers/StageReduser'
import { _getInvitedWorker } from 'redux/redusers/WorkerReduser'
import { _getClients } from 'redux/redusers/ClientReduser'
import Alert from './Alert/Alert'

function HomePage (props) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(_removeComandFromList([]))
  }, [])

  return (
    <>
      <Header />
      <MainScreen />
      <WhyCrm />
      <CRMfree id='sum' />
      {/* <ShowDemo/> */}
      <Footer />
      <Alert activePopup = {props.activePopup} setActive = {props.setPopup}/>
    </>

  )
}

export default HomePage
