import localforage from 'localforage'
import { _removeComandFromList, _setComandToList } from 'redux/redusers/ComandOfSalesReduser'
import { _getCompanySpace, _getCompanyTakenSpace } from 'redux/redusers/CompanyReduser'
import { _getUserInfo, _login, _logout, _registration } from 'redux/redusers/UserReduser'
import { _loginInvitedWorker } from 'redux/redusers/WorkerReduser'
import AuthService from 'requests/service/AuthService'

export const registration = async (dispatch, fio, email, tel, gb) => {
  return await AuthService.regisration(fio, email, tel, gb).then(data => data.data)
}

export const login = async (dispatch, email, password, body) => {
  const data = await AuthService.login(email, password).then(data => data.data)

  if (data.resp.status == 200) {
    if (data.user.isActivated) {
      localStorage.setItem('token', data.accsessToken)
      body.style.overflowY = 'scroll'

      dispatch(_login(data.user))
      dispatch({ type: 'SET_ISAYTH', payload: true })

      dispatch({ type: 'SET_COMAND_ID', payload: null })
      dispatch({ type: 'SET_USERID', payload: null })

      dispatch(_getCompanySpace(data.space))
      dispatch(_getCompanyTakenSpace(data.takenSpace))
    }
    return
  }
  return data.resp
}

export const logOut = async (dispatch) => {
  await AuthService.logout()
  localStorage.clear()
  localforage.clear()
  dispatch({ type: 'SET_COMAND_ID', payload: null })
  dispatch({ type: 'SET_USERID', payload: null })
  dispatch({ type: 'SET_COMAND_TITLE', payload: 'Любая команда продаж' })
  dispatch({ type: 'SET_USER_TITLE', payload: 'Любой ответсвенный' })
  dispatch({ type: 'SET_ISAYTH', payload: false })
  // dispatch(_removeComandFromList([]))
  dispatch(_logout())
}

export const checkAuth = async (dispatch) => {
  const respRefresh = await AuthService.refresh().then(data => data.data)
}

export const getUserInfo = async (dispatch, userId) => {
  await AuthService.getUserInfo(userId).then(data => dispatch(_getUserInfo(data.data)))
}

export const updateUser = async (dispatch, fio, email, tel, company, userId) => {
  await AuthService.updateUser(fio, email, tel, company, userId).then(data => dispatch(_getUserInfo(data.data)))
}

export const updateUserPassword = async (dispatch, oldPassword, userId, password) => {
  const updatedUser = await AuthService.updateUserPassword(userId, oldPassword, password).then(data => data.data)
  return updatedUser
}

export const uploadUserAvatar = async (dispatch, file, userId) => {
  await AuthService.uploadUserAvatar(file, userId).then(data => dispatch(_getUserInfo(data.data)))
}

export const deleteUserAvatar = async (dispatch, userId) => {
  await AuthService.deleteUserAvatar(userId).then(data => dispatch(_getUserInfo(data.data)))
}

export const sendUserStatement = async (title, comment, typeOfMethod, userId) => {
  await AuthService.sendStatement(title, comment, typeOfMethod, userId)
}
