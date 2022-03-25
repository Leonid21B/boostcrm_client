import axios from 'axios'
import config from '../config.js'

export const BASE_URL = config.apiBase

const api = axios.create({
  withCredentials: true,
  baseURL: config.apiBase
})

api.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${window.localStorage.getItem('token')}`
  return config
})

api.interceptors.response.use(res => {
  return res
}, error => {
  switch (error.response.status) {
    case 401:
      window.localStorage.clear()
      return
    case 405:
      window.localStorage.setItem('token', error.response.data.accsessToken)
      break
    default:
      break
  }
  return error.response
})

export default api
