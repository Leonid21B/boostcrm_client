import { ALL_DEALS, CACH_DEALS, NONE_DEALS, TODAY_DEALS } from 'redux/actionsTypes'

const defaultState = {
  all: 0,
  today: 0,
  none: 0,
  cach: ''
}

export const MenuReduser = (state = defaultState, { type, payload }) => {
  switch (type) {
    case ALL_DEALS:
      return { ...state, all: payload }
    case TODAY_DEALS:
      return { ...state, today: payload }
    case NONE_DEALS:
      return { ...state, none: payload }
    case CACH_DEALS:
      return { ...state, cach: payload + 1 }
    default:
      return state
  }
}
