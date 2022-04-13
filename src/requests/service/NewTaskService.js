import api from 'requests'

export default class NewtaskService {
  static async createTask (title, description, date, time, id, userId, workers) {
    try {
      return api.post('/create_task', { title, description, date, time, id, userId, workers })
    } catch (error) {

    }
  }

  static async getTasks (userId) {
    try {
      return api.get(`/tasks/${userId}`)
    } catch (error) {

    }
  }

  static async deleteFile (fileName,cardId) {
    try {
      return api.delete(`/cart/delete_file/${cardId}/${fileName}`)
    } catch (error) {

    }
  }

  static async getCurrentCartTasks (id) {
    try {
      return api.get(`/current_cart_tasks/${id}`)
    } catch (error) {

    }
  }

  static async updateTask (id, title, description, date, time, workers, userId) {
    try {
      return api.put('/update_task', { id, title, description, date, time, workers, userId })
    } catch (error) {

    }
  }

  static async closeTask (id, userId, cardId) {
    try {
      return api.delete(`/close_task/${id}/${userId}/${cardId}`)
    } catch (error) {

    }
  }

  static async deleteTask (id, cardId) {
    try {
      return api.delete(`/delete_task/${id}/${cardId}`)
    } catch (error) {
      console.log('deleteTask error', error)
    }
  }
}
