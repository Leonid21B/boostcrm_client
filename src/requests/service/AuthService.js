import axios from 'axios'

const { default: api, BASE_URL } = require('requests')

export default class AuthService {
  static async regisration (fio, email, tel, gb) {
    try {
      return api.post('/registration', { fio, email, tel, gb })
    } catch (error) {
 
    }
  }
  static async changeCurrency (id,currency) {
    try {
      return api.put('/change_currency', {id,currency})
    } catch (error) {
      console.log(error)
    }
  }
  static async rebuildPassword (email) {
    try {
      return api.post('/rebuild_user_password', {email})
    } catch (error) {
      console.log(error)
    }
  }

  static async login (email, password) {
    try {
      return api.post('/login', { email, password })
    } catch (error) {

    }
  }

  static async logout () {
    try {
      return api.post('/logout')
    } catch (error) {

    }
  }

  static async refresh () {
    try {
      return axios.get(`${BASE_URL}/refresh`, { withCredentials: true })
    } catch (error) {

    }
  }

  static async getUserInfo (userId) {
    try {
      return api.get(`/get_user_info/${userId}`)
    } catch (error) {

    }
  }

  static async updateUser (fio, email, tel, company, userId) {
    try {
      return api.post('/update_user', { fio, email, tel, company, userId })
    } catch (error) {

    }
  }

  static async updateUserPassword (userId, oldPassword, password) {
    try {
      return api.post('/update_user_password', { userId, oldPassword, password })
    } catch (error) {

    }
  }

  static async updateUserComand (userId, comandId) {
    try {
      return api.post('/update_user_comand', { userId, comandId })
    } catch (error) {

    }
  }

  static async uploadUserAvatar (file, userId) {
    try {
      const data = new FormData()
      data.append('file',  file) 
      return api.post(`/upload_user_avatar/${userId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    } catch (error) {
      console.log('uploadUserAvatar error', error)
    }
  }

  static async deleteUserAvatar (userId) {
    try {
      return api.delete(`/delete_user_avatar/${userId}`)
    } catch (error) {
      console.log('uploadUserAvatar error', error)
    }
  }

  static async sendStatement (title, comment, typeOfMethod, userId) {
    try {
      return api.post('/send_statement', { title, comment, typeOfMethod, userId })
    } catch (error) {
      console.log('sendStatement error', error)
    }
  }

  static async updateRole (userId, workerId, role) { 
    try {
      return api.put('/update_role', { userId, workerId, role })
    } catch (error) {
      console.log('updateRole error', error)
    }
  }
}
