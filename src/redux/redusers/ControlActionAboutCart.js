import { CREATE_ANALIICS_DATA, GET_ANALIICS_DATA } from 'redux/actionsTypes'

const defaultState = {
  analitics: null
}

export const contollActionAboutCart = (state = defaultState, { type, payload }) => {
  switch (type) {
    case CREATE_ANALIICS_DATA:
      return { ...state, analitics: payload }
    case GET_ANALIICS_DATA:
      return { ...state, analitics: payload }
    default:
      return state
  }
}

export const _createAnaliticsAboutCart = (payload) => ({ type: CREATE_ANALIICS_DATA, payload })
export const _getAnaliticsAboutCart = (payload) => ({ type: GET_ANALIICS_DATA, payload })
