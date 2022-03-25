import api from 'requests'

export default class WorkerService {
  static async sendinviteWorkerLink (email, userId) {
    try {
      return api.post('/send_invite', { email, userId })
    } catch (error) {
      console.log('error', error)
    }
  }

  static async deleteInvitedWorker (id, selectedWorkerId) {
    try {
      return api.delete(`/delete_invited_worker/${id}/${selectedWorkerId}`)
    } catch (error) {
      console.log('deleteInvitedWorker', error)
    }
  }

  static async getWorkerInfo (userId, comandId) {
    try {
      return api.get(`/get_worker_info/${userId}`)
    } catch (error) {
      console.log('error', error)
    }
  }
}
