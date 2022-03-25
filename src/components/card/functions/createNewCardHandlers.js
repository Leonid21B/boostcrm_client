// import { useDispatch } from 'react-redux'
// import { createAndSaveCart } from 'redux/asyncRedux/CreateCart'

function createCard (conditionObj, accessCallBack, conflictCallBack, checkTitleCallBack, checkCompanyTitleCallBack) {
  return async () => {
    if (conditionObj.access) {
      accessCallBack()
      return
    }
    if (conditionObj.emptyFields) {
      conflictCallBack()
      return
    }
    if (conditionObj.emptyTitle) {
      checkTitleCallBack()
      return
    }
    if (conditionObj.emptyCompanyTitle) {
      checkCompanyTitleCallBack()
    }
  }
}

function onlyNumber (str) {
  str = str.trim().replace(/[^\d\.]+/gi, '')
  const s = str.indexOf('.', str.indexOf('.'))
  if (!s) { str = str.substr(0, s - 1) }
  return str
}

function allowOnlyNumbersInInput (targetValue, setTargetValue) {
  setTargetValue(onlyNumber(targetValue))
}

export {
  createCard,
  onlyNumber,
  allowOnlyNumbersInInput
}
