import { ADD_NEWTASK, COUNT_TASK, DATE_TASK, GET_ALLTASKS, GET_CURRENT_TASK, NAME_TASK, TIME_TASK, VALUE_TASK, WITH_OUT_TASKS } from 'redux/actionsTypes'

const defaultState = {
  tasks: [],
  taskLength: '',
  currentCartTask: [],
  currentTask: {},
  countTask: 0,
  withOutTasks: '0'
}

export const taskReduser = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_NEWTASK:
      return { ...state, tasks: [...state.tasks, action.payload] }
    case GET_ALLTASKS:
      return { ...state, tasks: [...action.payload] }
    case GET_CURRENT_TASK:
      return { ...state, currentTask: action.payload }
    case COUNT_TASK:
      return { ...state, countTask: state.countTask + action.payload }
    case WITH_OUT_TASKS:
      return { ...state, withOutTasks: state.withOutTasks + action.payload }

    default:
      return state
  }
}

export const _postTask = (payload) => ({ type: ADD_NEWTASK, payload })
export const _getALLTask = (payload) => ({ type: GET_ALLTASKS, payload })
export const _countTask = (payload) => ({ type: COUNT_TASK, payload })
export const _getCurrentCartTask = (payload) => ({ type: GET_CURRENT_TASK, payload })
