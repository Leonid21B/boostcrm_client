import api from 'requests'
export default class StageService {
  static async createStage (title, img, userId) {
    try {
      return api.post('/create_stage', { title, img, userId })
    } catch (e) {
      console.log('e', e)
    }
  }

  static async getStages (userId, comandId) {
    try {
      return api.get(`/stages/${userId}`)
    } catch (e) {
      console.log('e', e)
    }
  }

  static async updateStage (id, title, img, userId) {
    try {
      return api.put('/update-stage', { id, title, img, userId })
    } catch (e) {
      console.log('e', e)
    }
  }

  static async deleteStage (id, userId, transferto) {
    try {
      return api.delete(`/stage/${id}/${userId}/${transferto}`)
    } catch (e) {
      console.log('e', e)
    }
  }
}
