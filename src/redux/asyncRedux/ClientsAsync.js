import { _getALLCarts } from 'redux/redusers/CartReduser'
import { _createClient, _deleteClient, _getAll, _getClients, _getClientsCarts, _getClientsLength, _getCurrentClient, _updateClient, _updateFlag } from 'redux/redusers/ClientReduser'
import { _getCompanyPaymentDate, _getCompanySpace, _getCompanyTakenSpace, _getFieldsStr } from 'redux/redusers/CompanyReduser'
import { _getInvitedWorker } from 'redux/redusers/WorkerReduser'
import ClientService from 'requests/service/ClientService'

export const createClient = async (dispatch, { name, org, iin, tel, email, userId }) => {
  const resp = await ClientService.create(name, org, iin, tel, email, userId).then(data => data.data)
  dispatch(_createClient(resp.createdClient))
  dispatch(_getCompanySpace(resp.space))
  dispatch(_getCompanyTakenSpace(resp.takenSpace))
}

export const getCompany = async(dispatch,userId) => {
  const resp = await ClientService.getCompany(userId).then(data => data.data)
  dispatch(_getCompanySpace(resp.space))
  dispatch(_getCompanyTakenSpace(resp.takenSpace))
  dispatch(_getCompanyPaymentDate(resp.paymentDate))
}
export const flagClient = async(dispatch,userId) => {
  const resp = await ClientService.updateFlag(userId)
  dispatch(_updateFlag)
 
}

export const getClients = async (dispatch, userId, limit, page) => {
  const resp = await ClientService.get(userId, limit, page).then(data => data.data)
  dispatch(_getClients(resp.clients))
  dispatch(_getClientsLength(resp.clientsLength)) 
  dispatch(_getCompanySpace(resp.space))
  dispatch(_getFieldsStr(resp.fields))
  //dispatch(_getCompanyTakenSpace(resp.takenSpace))
  return { success: resp.success, refusual: resp.refusual,notDeal:resp.notDeal }
}

export const deleteClient = async (dispatch, id, userId) => {
  await ClientService.delete(id, userId)
}

export const getAllClients = async (dispatch,userId) => {
  const resp = await ClientService.getAll(userId)
  dispatch(_getAll(resp.data.clients))
  
}

export const getCurrent = async (dispatch, id) => {
  await ClientService.getCurrent(id).then(data => {
    console.log(data.data)
    dispatch(_getCurrentClient(data.data.client))
    dispatch(_getInvitedWorker(data.data.workers))
  })
}

export const updateClient = async (dispatch, { id, name, org, iin, tel, email, userId }) => {
  await ClientService.updateClient(id, name, org, iin, tel, email, userId)
    .then(data => dispatch(_updateClient(data.data)))
}

export const checkClient = async (dispatch, id, name, org, tel, email, userId) => {
  await ClientService.checkClient(id, name, org, tel, email, userId)
    .then(data => dispatch(_getClientsCarts(data.data.currentCart)))
}
