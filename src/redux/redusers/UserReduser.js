import { ADD_USER_CART, GET_USER_CARTS, GET_USER_INFO, LOGIN_USER, LOGOUT_USER, REFRESH_TOKEN_USER, REGISTRATION_USER } from 'redux/actionsTypes'

const CHANGE_ROLE = 'CHANGE_ROLE'
const CHANGE_CURRENCY = 'CHANGE_CURRENCY'

const defaultState = {
  authUser: {},
  user: {
    currency: 1,
  },
  userCart: [],
  isAuth: '',
  userId: null,
  userTitle: 'Любой ответсвенный'
}

export const UserReduser = (state = defaultState, action) => {
  switch (action.type) {
    case REGISTRATION_USER:
      return { ...state, authUser: action.payload }
    case LOGIN_USER:
      return { ...state, user: action.payload }
      // return { ...state, users: action.payload }
    case LOGOUT_USER:
      return { ...state, user: {} }
    case REFRESH_TOKEN_USER:
      return { ...state, user: action.payload } 
      
    case CHANGE_CURRENCY:
      let newUser = {...state.user}
      newUser.currency = action.val

      return { ...state, user: newUser } 

    case GET_USER_INFO:
      return { ...state, user: action.payload }

    case CHANGE_ROLE:
      let user = {...state.user}
      if(action.payload == true){
        user.role = 'user'
        console.log(user)
      }
      return { ...state, user: user }

    case ADD_USER_CART:
      return { ...state, userCart: [...state.userCart, action.payload] }
    case GET_USER_CARTS:
      return { ...state, userCart: [...action.payload] }

    case 'SET_ISAYTH':
      return { ...state, isAuth: action.payload }

    case 'SET_USERID':
      return { ...state, userId: action.payload }

    case 'SET_USER_TITLE':
      return { ...state, userTitle: action.payload }
    default:
      return state
  }
}

export const _registration = (payload) => ({ type: REGISTRATION_USER, payload })
export const _login = (payload) => ({ type: LOGIN_USER, payload })
export const _logout = () => ({ type: LOGOUT_USER })
export const _refresh = (payload) => ({ type: REFRESH_TOKEN_USER, payload })
export const _getUserInfo = (payload) => ({ type: GET_USER_INFO, payload })
export const _changeAdmin = (payload) => ({type:CHANGE_ROLE, payload})
export const _changeCur = (val) => ({type:CHANGE_CURRENCY, val})
export const _addUserCart = (payload) => ({ type: ADD_USER_CART, payload })
export const _getUserCart = (payload) => ({ type: GET_USER_CARTS, payload })
