import React, { createContext } from 'react'
// import { Switch } from 'react-router';
import ReactDOM from 'react-dom'
import App from './App'
import './scss/style.scss'
import dotenv from 'dotenv'
import { BrowserRouter } from 'react-router-dom'
import Requests from './requests/requests.js'
import { Provider } from 'react-redux'
import { persistor, store } from 'redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

dotenv.config()

const requests = new Requests()
export const RequestsContexct = createContext({})

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <RequestsContexct.Provider value={requests}>
          <App />
        </RequestsContexct.Provider>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
