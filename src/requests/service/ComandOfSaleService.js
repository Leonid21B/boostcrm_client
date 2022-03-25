import api from 'requests'

export default class ComandOfSaleService {
  static async createComand (title, userId, workers, img) {
    try {
      return api.post('/create_comand', { title, userId, workers, img })
    } catch (error) {
      console.log('error', error)
    }
  }

  static async getComand (userId) {
    try {
      return api.get(`/get_comand_of_sale/${userId}`)
    } catch (error) {
      console.log('error', error)
    }
  }

  static async getCurrentComand (id) {
    try {
      return api.get(`/get_current_comand_of_sale/${id}`)
    } catch (error) {
      console.log('error', error)
    }
  }

  static async UpdateComand (comandId, title, workers, userId, img) {
    try {
      return api.put('/update_comand_of_sale', { comandId, title, workers, userId, img })
    } catch (error) {
      console.log('error', error)
    }
  }

  static async getComandStages (comandId) {
    try {
      return api.get('/get_comand_stages', { comandId })
    } catch (error) {
      console.log('error', error)
    }
  }

  static async deleteComand (id, userId, comandId) {
    try {
      return api.delete(`/delete_comand_of_sale/${id}/${userId}/${comandId}`)
    } catch (error) {
      console.log('error', error)
    }
  }
}
