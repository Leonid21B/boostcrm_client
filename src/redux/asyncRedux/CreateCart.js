import { _getALLCarts, _addCart, _getCurrentCart, _deleteCart, _getCountCart, _createSuccessCart, _getSuccessCart, _createNotSuccessCart, _getNotSuccessCart } from 'redux/redusers/CartReduser'
import { _getCompanySpace, _getCompanyTakenSpace } from 'redux/redusers/CompanyReduser'
import { _getStages } from 'redux/redusers/StageReduser'
import CartService from 'requests/service/CartService'

export const createAndSaveCart = async (dispatch,
  { title, company, name, price, tel, email, address, stageId, userId, comandId }) => {
  const resp =
        await CartService.createCart(title, company, name, price, tel, email, address, stageId, userId, comandId)
          .then(data => data.data)

  dispatch(_addCart(resp.resultCard))
  dispatch(_getCompanySpace(resp.space))
  dispatch(_getCompanyTakenSpace(resp.takenSpace))
}

export const updateCardStatus = async (type, cardId, message, userId, helper) => {
  await CartService.updateCardStatus(type, cardId, message, userId, helper)
}

export const createSuccessCart = async (dispatch, status, title, price, userId, cardId) => {
  await CartService.createSuccessCart(status, title, price, userId, cardId).then(data => dispatch(_createSuccessCart(data.data)))
}

export const getSuccessCart = async (dispatch, userId) => {
  await CartService.getSuccessCart(userId).then(data => dispatch(_getSuccessCart(data.data)))
}

export const createNotSuccessCart = async (dispatch, status, title, price, caption, userId, cardId) => {
  await CartService.createNotSuccessCart(status, title, price, caption, userId, cardId).then(data => dispatch(_createNotSuccessCart(data.data)))
}

export const getNotSuccessCart = async (dispatch, userId) => {
  await CartService.getNotSuccessCart(userId).then(data => dispatch(_getNotSuccessCart(data.data)))
}

export const deleteCurrentCart = async (dispatch, id, userId, stageId) => {
  const resp = await CartService.deleteCart(id, userId, stageId)
}

export const getAllCarts = async (dispatch, id, comandId) => {
  const cards = await CartService.getCarts(id, comandId).then(data => data.data)
  dispatch(_getALLCarts(cards))
  return cards
}

export const getcurrentCart = async (dispatch, id) => {
  const resp = await CartService.getCart(id).then(data => data.data)
  console.log(resp)
  dispatch(_getCurrentCart(resp.card))
  return resp
}

export const getcurrentCardHistory = async (dispatch, id) => {
  const resp = await CartService.getCardHistory(id)
}

export const createCardComment = async (dispatch, text, cardId, userId) => {
  const resp = await CartService.createCardComment(text, cardId, userId)
}

export const updateCardWorkes = async (dispatch, cardId, workerId, userId, typeOfDoing) => {
  const resp = await CartService.updateCartWorker(cardId, workerId, userId, typeOfDoing)
}

export const updateCardTitle = async (dispatch, cardId, title) => {
  const resp = await CartService.updateCardTitle(cardId, title).then(data => data.data)
  dispatch(_getCurrentCart(resp))
}
