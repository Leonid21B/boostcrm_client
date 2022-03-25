import { CREATE_COMAND_OF_SALE, GET_COMAD_OF_SALE, GET_COMAND_STAGES, GET_CURRENT_COMAND } from 'redux/actionsTypes'

const defaultState = {
  comands: [],

  comandListView: [],
  dropDownComands: [],

  currentComand: {},
  comandSatges: [],
  comandId: null,
  comandTitle: 'Любая команда продаж'

  // createdComand:[]
}

export const ComandReduser = (state = defaultState, { type, payload }) => {
  switch (type) {
    case CREATE_COMAND_OF_SALE:
      return { ...state, comands: [...state.comands, payload] }
    case GET_COMAD_OF_SALE:
      return { ...state, comands: [...payload] }

    case GET_CURRENT_COMAND:
      return { ...state, currentComand: payload }
    case GET_COMAND_STAGES:
      return { ...state, comandSatges: [...payload] }

    case 'SET_COMAND_TO_LIST':
      return { ...state, comandListView: [...state.comandListView, payload] }
    case 'DELETE_COMAND_FROM_LIST':
      return { ...state, comandListView: [...payload] }

    case 'SET_DROPDOWN_COMAND_TO_DROPDOWN_LIST':
      return { ...state, dropDownComands: [...state.dropDownComands, payload] }
    case 'REMOVE_DROPDOWN_COMAND_FROM_DROPDOWN_LIST':
      return { ...state, dropDownComands: [...payload] }

    case 'SET_COMAND_ID':
      return { ...state, comandId: payload }
    case 'SET_COMAND_TITLE':
      return { ...state, comandTitle: payload }

    default:
      return state
  }
}

export const _createComand = (payload) => ({ type: CREATE_COMAND_OF_SALE, payload })
export const _getComand = (payload) => ({ type: GET_COMAD_OF_SALE, payload })
export const _getCurrentComand = (payload) => ({ type: GET_CURRENT_COMAND, payload })
export const _getComandStages = (payload) => ({ type: GET_COMAND_STAGES, payload })

export const _setComandToList = (payload) => ({ type: 'SET_COMAND_TO_LIST', payload })
export const _removeComandFromList = (payload) => ({ type: 'DELETE_COMAND_FROM_LIST', payload })

export const _setDropDownComandToDropDownList = (payload) => ({ type: 'SET_DROPDOWN_COMAND_TO_DROPDOWN_LIST', payload })
export const _removeDropDownComandFromDropDownList = (payload) => ({ type: 'REMOVE_DROPDOWN_COMAND_FROM_DROPDOWN_LIST', payload })
