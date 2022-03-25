import api from 'requests'

export default class ControlActionsAboutCartService {
  static async create (title, type, id) {
    try {
      return api.post('/controll_action', { title, type, id })
    } catch (e) {
      console.log('ControlActionsAboutCartService', e.message)
    }
  }

  static async get () {
    try {
      return api.get('/controll_actions')
    } catch (e) {
      console.log('ControlActionsAboutCartService', e.message)
    }
  }
}
