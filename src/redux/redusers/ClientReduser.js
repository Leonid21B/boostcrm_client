import { CREATE_CLIENT, DELETE_CLIENT, GET_CLIENTS, GET_CLIENTS_CART, GET_CURRENT_CLIENT, UPDATE_CLIENT } from 'redux/actionsTypes'
const UPDATE_FLAG = 'UPDATE_FLAG'
const CLEAR_CLIENTS = 'CLEAR_CLIENTS'
const GET_ALL_CLIENTS = 'GET_ALL_CLIENTS'

const defaultState = {
  clients: [],
  allClients : [],
  currentClient: {},
  clientsCarts: [],
  isClientHasCards: false,
  clientsLength: 0,
  columns: [
    { id: 1, title: 'Ф.И.О', order: 1, value: 'name' },
    { id: 2, title: 'Организация', order: 2, value: 'org' },
    { id: 3, title: 'ИНН', order: 3, value: 'iin' },
    { id: 4, title: 'Телефон', order: 4, value: 'tel' },
    { id: 5, title: 'E-mail', order: 5, value: 'email' },
    { id: 6, title: 'E-dail', order: 7, value: 'edail' }
  ],
  title: '1',
  pageList: 0
}

export const clientReduser = (state = defaultState, { type, payload }) => {
  switch (type) {
    case CREATE_CLIENT:
      return { ...state, clients: [payload, ...state.clients] }

    case GET_CLIENTS:
      return { ...state, clients: [...state.clients, ...payload] }

    case DELETE_CLIENT:
      return { ...state, clients: [...payload] }
    case CLEAR_CLIENTS:
      return { ...state, clients: [] }

    case GET_CURRENT_CLIENT:
      return { ...state, currentClient: payload }

    case UPDATE_CLIENT:
      return { ...state, clients: [...payload] }

    case GET_CLIENTS_CART:
      return { ...state, clientsCarts: [...payload] }

    case GET_ALL_CLIENTS:
      return { ...state, allClients: [...payload] }

    case 'SET_ISCLIENTHASHCARDS':
      return { ...state, isClientHasCards: payload }
    case UPDATE_FLAG:
      let localId = null;
      for (let item in state.clients){
        if(state.clients[item]._id === payload){
          let clients = [...state.clients]
          clients[item].flag = 1
          return {
            ...state,clients:clients
          }
        }
      }
      return {...state}
    case 'SET_CLIENTLENGTH':
      return { ...state, clientsLength: payload }

    case 'SET_COLUMNS':
      return { ...state, columns: [...payload] }

    case 'SET_CLIENTS_PAGE':
      return { ...state, pageList: payload }
    default:
      return state
  }
}

export const _createClient = (payload) => ({ type: CREATE_CLIENT, payload })
export const _getClients = (payload) => ({ type: GET_CLIENTS, payload })
export const _clearClients = () => ({ type: CLEAR_CLIENTS })
export const _deleteClient = (payload) => ({ type: DELETE_CLIENT, payload })

export const _getAll = (payload) => ({ type: GET_ALL_CLIENTS, payload })

export const _getCurrentClient = (payload) => ({ type: GET_CURRENT_CLIENT, payload })
export const _updateClient = (payload) => ({ type: UPDATE_CLIENT, payload })
export const _updateFlag = (id) => ({ type: UPDATE_FLAG, id })
export const _getClientsCarts = (payload) => ({ type: GET_CLIENTS_CART, payload })
export const _getClientsLength = (payload) => ({ type: 'SET_CLIENTLENGTH', payload })
export const _setColumns = (payload) => ({ type: 'SET_COLUMNS', payload })
export const _setClientsPage = (payload) => ({ type: 'SET_CLIENTS_PAGE', payload })
