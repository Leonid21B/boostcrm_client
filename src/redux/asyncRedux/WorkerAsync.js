import localforage from 'localforage'
import { _getComand } from 'redux/redusers/ComandOfSalesReduser'
import { _getInvitedWorker, _inviteWorker } from 'redux/redusers/WorkerReduser'
import WorkerService from 'requests/service/WorkerService'

export const inviteWorker = async (distpatch, email, userId) => {
  const worker = await WorkerService.sendinviteWorkerLink(email, userId).then(data => data.data)
  return worker
}

export const deleteInvitedWorker = async (distpatch, id, selectedWorkerId) => {
  const userProfileData = await WorkerService.deleteInvitedWorker(id, selectedWorkerId).then(uP => uP.data)
  distpatch(_getInvitedWorker(userProfileData.workers))
}



export const getWorkerInfo = async (distpatch, userId, comandId) => {
  const workers = await WorkerService.getWorkerInfo(userId, comandId).then(data => data.data)
  distpatch(_getInvitedWorker(workers))
}
