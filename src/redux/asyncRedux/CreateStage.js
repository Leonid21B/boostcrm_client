import { _deleteCart } from 'redux/redusers/CartReduser'
import { _getCompanySpace, _getCompanyTakenSpace } from 'redux/redusers/CompanyReduser'
import { _addStage, _getStages, _removeStage } from 'redux/redusers/StageReduser'
import CartService from 'requests/service/CartService'
import StageService from 'requests/service/StageService'

export const createStage = async (dispatch, title, img, userId) => {
  const resp = await StageService.createStage(title, img, userId).then(data => data.data)

  dispatch(_addStage(resp.stage))
  dispatch(_getCompanySpace(resp.space))
  dispatch(_getCompanyTakenSpace(resp.takenSpace))
}

export const getAllStages = async (dispatch, userId, comandId) => {
  const resp = await StageService.getStages(userId, comandId)
  dispatch(_getStages(resp.data))
}

export const updateStage = async (dispatch, id, title, img, userId) => {
  const resp = await StageService.updateStage(id, title, img, userId)
  dispatch(_getStages(resp.data))
}

export const removeCurrentStage = async (dispatch, id, userId, transferto) => {
  const resp = await StageService.deleteStage(id, userId, transferto)
  dispatch(_getCompanyTakenSpace(resp.data.takenSpace))
}
