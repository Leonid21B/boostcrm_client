
const defaultState = {
  space: 0,
  takenSpace: 0,
  paymentDate: new Date()
}

export const companyReduser = (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'GET_COMPANY_SPACE':
      return { ...state, space: payload }
    case 'GET_COMPANY_TAKEN_SPACE':
      return { ...state, takenSpace: payload }

    case 'GET_COMPANY_PAYMENT_DATE':
      return { ...state, paymentDate: payload }
    default:
      return state
  }
}

export const _getCompanySpace = (payload) => ({ type: 'GET_COMPANY_SPACE', payload })
export const _getCompanyTakenSpace = (payload) => ({ type: 'GET_COMPANY_TAKEN_SPACE', payload })
export const _getCompanyPaymentDate = (payload) => ({ type: 'GET_COMPANY_PAYMENT_DATE', payload })
