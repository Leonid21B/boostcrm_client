import { _getALLCarts } from 'redux/redusers/CartReduser'
import { _createClient, _deleteClient, _getClients, _getClientsCarts, _getClientsLength, _getCurrentClient, _updateClient } from 'redux/redusers/ClientReduser'
import { _getCompanySpace, _getCompanyTakenSpace } from 'redux/redusers/CompanyReduser'
import ClientService from 'requests/service/ClientService'

export const createClient = async (dispatch, { name, org, iin, tel, email, userId }) => {
  const resp = await ClientService.create(name, org, iin, tel, email, userId).then(data => data.data)
  dispatch(_createClient(resp.createdClient))
  dispatch(_getCompanySpace(resp.space))
  dispatch(_getCompanyTakenSpace(resp.takenSpace))
}

export const getClients = async (dispatch, userId, limit, page) => {
  const resp = await ClientService.get(userId, limit, page).then(data => data.data)
  dispatch(_getClients(resp.clients))
  dispatch(_getClientsLength(resp.clientsLength)) 
  dispatch(_getCompanySpace(resp.space))
  dispatch(_getCompanyTakenSpace(resp.takenSpace))
  return { success: resp.success, refusual: resp.refusual }
}

export const deleteClient = async (dispatch, id, userId) => {
  await ClientService.delete(id, userId)
}

export const getCurrent = async (dispatch, id) => {
  await ClientService.getCurrent(id).then(data => dispatch(_getCurrentClient(data.data)))
}

export const updateClient = async (dispatch, { id, name, org, iin, tel, email, userId }) => {
  await ClientService.updateClient(id, name, org, iin, tel, email, userId)
    .then(data => dispatch(_updateClient(data.data)))
}

export const checkClient = async (dispatch, id, name, org, tel, email, userId) => {
  await ClientService.checkClient(id, name, org, tel, email, userId)
    .then(data => dispatch(_getClientsCarts(data.data.currentCart)))
}
