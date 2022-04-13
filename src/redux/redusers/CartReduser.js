import { ADDRESS_CART, ADD_NEWCART, CART_ID, COMPANY_CART, DAY_CART, DELETE_CART, EMAIL_CART, GET_ALLCARTS, GET_CURRENTCART, GET_LENGTH_CART, GET_NOTSUCCESSCART, GET_SUCCESSCART, NAME_CART, NOT_SUCCESS_CART, PERSON_CART, PRICE_CART, SUCCESS_CART, TEL_CART } from 'redux/actionsTypes'

const DEL_FILE = "DEL_FILE"

const defaultState = {
  carts: [],
  successCarts: [],
  notSuccessCarts: [],
  overdueCards: [],
  cardId: null,
  currentCart: {},
  isAuth: false
}

export const cartReduser = (state = defaultState, { type, payload }) => {
  switch (type) {
    case ADD_NEWCART:
      return { ...state, carts: [...state.carts, payload] }

    case GET_ALLCARTS:
      return { ...state, carts: [...payload] }

    case DELETE_CART:
      return { ...state, carts: [...payload] }

    case GET_CURRENTCART:
      return { ...state, currentCart: payload }

    case GET_LENGTH_CART:
      return { ...state, cartLength: [...payload] }
    case DEL_FILE:
      let newHistory = Array.from(state.currentCart.history).filter(item => item.title != payload)
      let newCurrentCart = {...state.currentCart, history: newHistory}
      console.log(newCurrentCart)
      return { ...state,currentCart:newCurrentCart}

    case SUCCESS_CART:
      return { ...state, successCarts: [...payload] }

    case GET_SUCCESSCART:
      return { ...state, successCarts: [...payload] }

    case NOT_SUCCESS_CART:
      return { ...state, notSuccessCarts: [...payload] }

    case GET_NOTSUCCESSCART:
      return { ...state, notSuccessCarts: [...payload] }

    case CART_ID:
      return { ...state, cardId: payload }

    case 'isAuth':
      return { ...state, isAuth: payload }

    case 'USER_OR_COMAND_ID':
      return { ...state, userOrComandId: payload }

    case 'GET_OVERDUE_CARDS':
      return { ...state, overdueCards: payload }

    default:
      return state
  }
}

export const _addCart = (payload) => ({ type: ADD_NEWCART, payload })
export const _deleteCart = (payload) => ({ type: DELETE_CART, payload })
export const _getCardId = (payload) => ({ type: CART_ID, payload })
export const _getCurrentCart = (payload) => ({ type: GET_CURRENTCART, payload })
export const _createSuccessCart = (payload) => ({ type: SUCCESS_CART, payload })
export const _getSuccessCart = (payload) => ({ type: GET_SUCCESSCART, payload })
export const _deleteFile = (payload) => ({ type: DEL_FILE, payload })

export const _createNotSuccessCart = (payload) => ({ type: NOT_SUCCESS_CART, payload })
export const _getNotSuccessCart = (payload) => ({ type: GET_NOTSUCCESSCART, payload })

export const _getALLCarts = (payload) => ({ type: GET_ALLCARTS, payload })
export const _getOverdueCards = (payload) => ({ type: 'GET_OVERDUE_CARDS', payload })
