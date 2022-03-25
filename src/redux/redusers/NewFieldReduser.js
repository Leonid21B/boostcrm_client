import { CREATE_NEW_FIELD, GET_FIELDS } from 'redux/actionsTypes'

const defaultState = {
  fields: []
}

export const NewFieldReduser = (state = defaultState, { type, payload }) => {
  switch (type) {
    case CREATE_NEW_FIELD:
      return { ...state, fields: [...payload] }
    case GET_FIELDS:
      return { ...state, fields: [...payload] }
    default:
      return state
  }
}

export const _createField = (payload) => ({ type: CREATE_NEW_FIELD, payload })
export const _getFields = (payload) => ({ type: GET_FIELDS, payload })
