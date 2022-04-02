import api from 'requests'

export default class ClientService {
  static async create (name, org, iin, tel, email, userId) {
    try {
      return api.post('/create_client', { name, org, iin, tel, email, userId,flag : 0 })
    } catch (e) {

    }
  }
  static async updateFlag(userId){
    try {
      return api.put(`/flag_client/${userId}`)
    } catch (e) {

    }  
  }
  static async get (userId, limit = 10, page = 1) {
    try {
      return api.get(`/clients/${userId}`, {
        params: {
          limit: limit,
          page: page
        }
      })
    } catch (e) {

    }
  }

  static async delete (id, userId) {
    try {
      return api.delete(`/client/${id}/${userId}`)
    } catch (e) {

    }
  }

  static async getCurrent (id) {
    try {
      return api.get(`/current_client/${id}`)
    } catch (e) {

    }
  }

  static async updateClient (id, name, org, iin, tel, email, userId) {
    try {
      return api.put('/update_client', { id, name, org, iin, tel, email, userId })
    } catch (e) {

    }
  }

  static async checkClient (id, name, org, tel, email, userId) {
    try {
      return api.post('/check_client', { id, name, org, tel, email, userId })
    } catch (e) {

    }
  }

  static async updateClientFields (fields, userId) {
    try {
      return api.put('/update-client-fileds', { fields, userId })
    } catch (e) {

    }
  }

  static async uploadClientFromFile (file, userId) {
    try {
      const data = new FormData()
      data.append('file', file)
      return api.post(`/upload-clients-from-file/${userId}`, data)
    } catch (e) {

    }
  }
}
