import { ADD_STAGE, GET_STAGES, REMOVE_STAGE } from 'redux/actionsTypes'

const defaultState = {
  stages: []
}

export const stageReduser = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_STAGE:
      return { ...state, stages: [...state.stages, action.payload] }
    case GET_STAGES:
      return { ...state, stages: [...action.payload] }
    case REMOVE_STAGE:
      return { ...state, stages: [...action.payload] }
    default:
      return state
  }
}

export const _addStage = (payload) => ({ type: ADD_STAGE, payload })
export const _getStages = (payload) => ({ type: GET_STAGES, payload })
export const _removeStage = (payload) => ({ type: REMOVE_STAGE, payload })
