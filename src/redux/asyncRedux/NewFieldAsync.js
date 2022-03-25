import { _getCurrentCart } from 'redux/redusers/CartReduser'
import { _createField, _getFields } from 'redux/redusers/NewFieldReduser'
import NewFieldService from 'requests/service/NewFieldService'

export const createNewField = async (dispatch, title, value, id, userId) => {
  const card = await NewFieldService.create(title, value, id, userId).then(data => data.data)
  dispatch(_getCurrentCart(card))
}

export const getFields = async (dispatch, cardId) => {
  await NewFieldService.get(cardId).then(data => dispatch(_getFields(data.data)))
}

export const updateCardField = async (dispatch, cardId, fieldId, val, userId) => {
  const card = await NewFieldService.update(cardId, fieldId, val, userId).then(data => data.data)
  dispatch(_getCurrentCart(card))
}
