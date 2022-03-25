import { GET_INVITED_WORKER, INVITE_WORKER, LOGIN_INVITE_USER } from 'redux/actionsTypes'

const defaultState = {
  workers: [],
  woerker: {}
}

export const WorkerReduser = (state = defaultState, { type, payload }) => {
  switch (type) {
    case INVITE_WORKER:
      return { ...state, workers: [...state.workers, payload] }
    case GET_INVITED_WORKER:
      return { ...state, workers: payload && payload.length ? [...payload] : []}
    case LOGIN_INVITE_USER:
      return { ...state, woerker: payload }
    default:
      return state
  }
}

export const _inviteWorker = (payload) => ({ type: INVITE_WORKER, payload })
export const _getInvitedWorker = (payload) => ({ type: GET_INVITED_WORKER, payload })
export const _loginInvitedWorker = (payload) => ({ type: LOGIN_INVITE_USER, payload })
