import api from 'requests'

export default class MainService {
  static async getAllDealInfo ({ userId }) {
    try {
      return api.get(`/get-deals-info/${userId}`)
    } catch (error) {
      console.log('getAllDealInfo error', error)
    }
  }

  static async getUserProfile ({ userId }) {
    try {
      return api.get(`/get-user-profile/${userId}`)
    } catch (error) {
      console.log('getAllDealInfo error', error)
    }
  }

  static async getAnaliticsInfo ({ userId }) {
    try {
      return api.get(`/get-analitics-info/${userId}`)
    } catch (error) {
      console.log('getAllDealInfo error', error)
    }
  }

  static async getCurrentAnaliticsInfo ({ comandId }) {
    try {
      return api.get(`/get-current-analitics-info/${comandId}`)
    } catch (error) {
      console.log('getAllDealInfo error', error)
    }
  }

  static async getCurrentUserCards ({ userId }) {
    try {
      return api.get(`/get-current-user-cards/${userId}`)
    } catch (error) {
      console.log('getAllDealInfo error', error)
    }
  }

  static async getCurrentComandCards ({ comandId }) {
    try {
      return api.get(`/get-current-comand-cards/${comandId}`)
    } catch (error) {
      console.log('getAllDealInfo error', error)
    }
  }

  static async getAnaliticsInfoByDate ({ type, userId, comandId, unitMonth }) {
    try {
      return api.get(`/get-analitics-info-byDate/${type}/${userId}/${comandId}/${unitMonth}`)
    } catch (error) {
      console.log('getAnaliticsInfoByDate error', error)
    }
  }

  static async getAnaliticsUserInfoByDate ({ type, userId, unitMonth }) {
    try {
      return api.get(`/get-analitics-user-info-byDate/${type}/${userId}/${unitMonth}`)
    } catch (error) {
      console.log('getAnaliticsUserInfoByDate error', error)
    }
  }

  static async createPaymentRequest ({ userId, sum, paySystem }) {
    try {
      return api.get(`/generatePay/${userId}/${sum}/${paySystem}`)
    } catch (error) {
      console.log('getAllDealInfo error', error)
    }
  }

  static async red () {
    try {
      return api.get('/red')
    } catch (error) {
      console.log('getAllDealInfo error', error)
    }
  }
}
