import { _getCurrentCart, _setHistory } from 'redux/redusers/CartReduser'
import { _createField, _getFields } from 'redux/redusers/NewFieldReduser'
import CartService from 'requests/service/CartService'
import NewFieldService from 'requests/service/NewFieldService'

export const createNewField = async (dispatch, title, value, id, userId) => {
  const card = await NewFieldService.create(title, value, id, userId).then(data => data.data)
  dispatch(_getCurrentCart(card))
}

export const getHistory = async (dispatch,cartId) => {
  const cardHistory = await CartService.getCardHistory(cartId).then(resp => resp.data)
  console.log(cardHistory)
  dispatch(_setHistory(cardHistory))
}
export const getFields = async (dispatch, cardId) => {
  await NewFieldService.get(cardId).then(data => dispatch(_getFields(data.data)))
}

export const updateCardField = async (dispatch, cardId, fieldId, val, userId) => {
  const card = await NewFieldService.update(cardId, fieldId, val, userId).then(data => data.data)
  dispatch(_getCurrentCart(card))
}
