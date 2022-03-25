import api from 'requests'

export default class NewFieldService {
  static async create (title, value, id, userId) {
    try {
      return api.post('/create_field', { title, value, id, userId })
    } catch (e) {
      console.log('e', e)
    }
  }

  static async get (cardId) {
    try {
      return api.get(`/fields/${cardId}`)
    } catch (e) {
      console.log('e', e)
    }
  }

  static async update (cardId, fieldId, val, userId) {
    try {
      return api.put('/field_update', { cardId, fieldId, val, userId })
    } catch (e) {
      console.log('e', e)
    }
  }
}
