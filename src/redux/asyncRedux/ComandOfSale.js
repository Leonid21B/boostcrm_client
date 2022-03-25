import { _createComand, _getComand, _getComandStages, _getCurrentComand } from 'redux/redusers/ComandOfSalesReduser'
import { _getCompanySpace, _getCompanyTakenSpace } from 'redux/redusers/CompanyReduser'
import { _getInvitedWorker } from 'redux/redusers/WorkerReduser'
import ComandOfSaleService from 'requests/service/ComandOfSaleService'

export const getComandOfSale = async (dispatch, userId) => {
  await ComandOfSaleService.getComand(userId).then(data => dispatch(_getComand(data.data)))
}

export const cretateComandOfSale = async (dispatch, title, userId, workers, img) => {
  const comandData = await ComandOfSaleService.createComand(title, userId, workers, img).then(comandData => comandData.data)

  dispatch(_getComand(comandData.comands))
  dispatch(_getInvitedWorker(comandData.workers))
  dispatch(_getCompanySpace(comandData.space))
  dispatch(_getCompanyTakenSpace(comandData.takenSpace))
}

export const deleteComandOfSale = async (dispatch, id, userId, comandId) => {
  const comandData = await ComandOfSaleService.deleteComand(id, userId, comandId).then(comandData => comandData.data)
  dispatch(_getComand(comandData.comands))
  dispatch(_getInvitedWorker(comandData.workers))
}

export const updateComandOfSale = async (dispatch, comandId, title, workers, userId, img) => {
  const comandData =
        await ComandOfSaleService.UpdateComand(comandId, title, workers, userId, img).then(comandData => comandData.data)
  dispatch(_getInvitedWorker(comandData.workers))
  dispatch(_getComand(comandData.comands))
}

export const getComandStages = async (dispatch, comandId) => {
  await ComandOfSaleService.getComandStages(comandId).then(data => dispatch(_getComandStages(data.data)))
}

export const getCurrentComand = async (dispatch, id) => {
  await ComandOfSaleService.getCurrentComand(id).then(data => dispatch(_getCurrentComand(data.data)))
}
