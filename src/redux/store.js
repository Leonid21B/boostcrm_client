import localForage from 'localforage'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import thunk from 'redux-thunk'
import { cartReduser } from './redusers/CartReduser'
import { clientReduser } from './redusers/ClientReduser'
import { ComandReduser } from './redusers/ComandOfSalesReduser'
import { companyReduser } from './redusers/CompanyReduser'
import { contollActionAboutCart } from './redusers/ControlActionAboutCart'
import { MenuReduser } from './redusers/MenuReduser'
import { NewFieldReduser } from './redusers/NewFieldReduser'
import { taskReduser } from './redusers/NewTaskReduser'
import postReducer from './redusers/PostReducer'
import { stageReduser } from './redusers/StageReduser'
import { UserReduser } from './redusers/UserReduser'
import { WorkerReduser } from './redusers/WorkerReduser'

const rootReduser = combineReducers({
  newTask: taskReduser,
  newCart: cartReduser,
  newStages: stageReduser,
  controllActionAboutCart: contollActionAboutCart,
  menu: MenuReduser,
  field: NewFieldReduser,
  client: clientReduser,
  user: UserReduser,
  comand: ComandReduser,
  worker: WorkerReduser,
  companySpace: companyReduser,
  post:postReducer,
})

const persistConfig = {
  key: 'root',
  storage: localForage
}

const configureReducer = persistReducer(persistConfig, rootReduser)

export const store = createStore(configureReducer, applyMiddleware(thunk))

export const persistor = persistStore(store, undefined)
