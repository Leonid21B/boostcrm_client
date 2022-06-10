import CartService from './service/CartService'
import NewtaskService from './service/NewTaskService'
import StageService from './service/StageService'

export default class Requests {
  async createStage (title) {
    const resp = await StageService.create(title).then(data => data)
    window.localStorage.setItem('stage-id', JSON.stringify(resp.data._id))
    window.localStorage.setItem('stage', JSON.stringify(resp.data))
    console.log('resp', resp.data)
  }

  async getAllStages () {
    const resp = await StageService.getStages().then(data => data)
    console.log('resp stages', JSON.stringify(resp.data))
    window.localStorage.setItem('stages', JSON.stringify(resp.data))
  }

  async deleteStage (id) {
    const resp = await StageService.deleteStage(id)
    window.localStorage.removeItem('stage-id')
    window.localStorage.removeItem('stage')
    console.log(' del resp', resp,111)
  }

  // carts
  async createCart (title, company, name, price, tel, email, address, id) {
    const resp = await CartService.create(title, company, name, price, tel, email, address, id).then(data => data)
    window.localStorage.setItem('cart', JSON.stringify(resp.data))
    console.log('resp createcart', resp.data._id)
  }

  async getCarts () {
    const resp = await CartService.getCarts().then(data => data)
    console.log('resp carts', JSON.stringify(resp.data))
    window.localStorage.setItem('carts', JSON.stringify(resp.data))
  }

  async getCurrentCart (id) {
    const resp = await CartService.getCart(id).then(data => data)
    console.log('resp carts', JSON.stringify(resp.data))
    window.localStorage.setItem('cartCurrentInfo', JSON.stringify(resp.data))
  }

  async deleteCurrentCart (id) {
    const resp = await CartService.deleteCurrentCart(id).then(data => data)
    console.log('resp delete carts', JSON.stringify(resp.data))
  }

  async createTask (nametask, valuetask, datetask, timetask) {
    const resp = await NewtaskService.create(nametask, valuetask, datetask, timetask).then(data => data)
    window.localStorage.setItem('newtask', JSON.stringify(resp.data))
    console.log('resp', resp.data)
  }
}
