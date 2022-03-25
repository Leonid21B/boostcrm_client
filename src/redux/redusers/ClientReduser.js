import { CREATE_CLIENT, DELETE_CLIENT, GET_CLIENTS, GET_CLIENTS_CART, GET_CURRENT_CLIENT, UPDATE_CLIENT } from 'redux/actionsTypes'

const defaultState = {
  clients: [],
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
      return { ...state, clients: [...payload] }

    case DELETE_CLIENT:
      return { ...state, clients: [...payload] }

    case GET_CURRENT_CLIENT:
      return { ...state, currentClient: payload }

    case UPDATE_CLIENT:
      return { ...state, clients: [...payload] }

    case GET_CLIENTS_CART:
      return { ...state, clientsCarts: [...payload] }

    case 'SET_ISCLIENTHASHCARDS':
      return { ...state, isClientHasCards: payload }

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
export const _deleteClient = (payload) => ({ type: DELETE_CLIENT, payload })
export const _getCurrentClient = (payload) => ({ type: GET_CURRENT_CLIENT, payload })
export const _updateClient = (payload) => ({ type: UPDATE_CLIENT, payload })
export const _getClientsCarts = (payload) => ({ type: GET_CLIENTS_CART, payload })
export const _getClientsLength = (payload) => ({ type: 'SET_CLIENTLENGTH', payload })
export const _setColumns = (payload) => ({ type: 'SET_COLUMNS', payload })
export const _setClientsPage = (payload) => ({ type: 'SET_CLIENTS_PAGE', payload })
