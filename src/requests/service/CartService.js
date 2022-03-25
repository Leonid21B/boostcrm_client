import api from 'requests'

export default class CartService {
  static async createCart (title, company, name, price, tel, email, address, stageId, userId, comandId) {
    try {
      return api.post('/create_cart', { title, company, name, price, tel, email, address, stageId, userId, comandId })
    } catch (e) {
      console.log('e', e)
    }
  }

  static async getCarts (userId, comandId) {
    try {
      return api.get(`/carts/${userId}`)
    } catch (e) {
      console.log('e', e)
    }
  }

  static async getCart (id) {
    try {
      return api.get(`/cart/${id}`)
    } catch (e) {
      console.log('e', e)
    }
  }

  static async getCardHistory (id) {
    try {
      return api.get(`/card_history/${id}`)
    } catch (e) {
      console.log('e', e)
    }
  }

  static async createCardComment (text, cardId, userId) {
    try {
      return api.post('/create_comment', { text, cardId, userId })
    } catch (e) {
      console.log('e', e)
    }
  }

  static async deleteCart (id, userId) {
    try {
      return api.delete(`/cart/${id}/${userId}`)
    } catch (e) {
      console.log('e', e)
    }
  }

  static async deleteCarts (id, userId) {
    try {
      return api.delete(`/carts/${id}/${userId}`)
    } catch (e) {
      console.log('e', e)
    }
  }

  static async updateCart (field, typeOfField, id, userId) {
    try {
      return api.put('/cart_update', { field, typeOfField, id, userId })
    } catch (e) {
      console.log('e', e)
    }
  }

  static async updateCartStage (currentStage, id, userId) {
    try {
      return api.put('/cart_update_stage', { currentStage, id, userId })
    } catch (e) {
      console.log('e', e)
    }
  }

  static async updateCartWorker (id, workerId, userId, typeOfDoing) {
    try {
      return api.put('/cart_update_worker', { id, workerId, userId, typeOfDoing })
    } catch (e) {
      console.log('e', e)
    }
  }

  static async updateCardStatus (type, cardId, message, userId, helper) {
    try {
      return api.put('/cart_update_status', { type, cardId, message, userId, helper })
    } catch (e) {
      console.log('e', e)
    }
  }

  static async uploadFile (file, cardId, userId) {
    try {
      return api.post(`/cart_upload_file/${cardId}/${userId}`, file, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    } catch (error) {
      console.log('uploadFile', error)
    }
  }

  static async createSuccessCart (status, title, price, userId, cardId) {
    try {
      return api.post('/create_successCart', { status, title, price, userId, cardId })
    } catch (error) {
      console.log('error', error)
    }
  }

  static async getSuccessCart (userId) {
    try {
      return api.get(`/get_successCart/${userId}`)
    } catch (error) {
      console.log('error', error)
    }
  }

  static async createNotSuccessCart (status, title, price, caption, userId, cardId) {
    try {
      return api.post('/create_notsuccessCart', { status, title, price, caption, userId, cardId })
    } catch (error) {
      console.log('error', error)
    }
  }

  static async getNotSuccessCart (userId) {
    try {
      return api.get(`/get_notsuccessCart/${userId}`)
    } catch (error) {
      console.log('error', error)
    }
  }

  static async updateCardTitle (cardId, title) {
    try {
      return api.put('/cart_update_title', { cardId, title })
    } catch (error) {
      console.log('error', error)
    }
  }
}
