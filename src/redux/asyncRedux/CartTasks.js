import NewtaskService from 'requests/service/NewTaskService'
import { _getALLTask, _postTask, _getCurrentCartTask } from 'redux/redusers/NewTaskReduser'
import { _deleteFile, _getCurrentCart } from 'redux/redusers/CartReduser'
import { _getCompanyTakenSpace } from 'redux/redusers/CompanyReduser'

export const getTasks = async (dispatch, userId) => {
  const resp = await NewtaskService.getTasks(userId)
  dispatch(_getALLTask(resp.data))
}

export const deleteFileAsync = async (dispatch,fileName,cardId) => {
  const resp = await NewtaskService.deleteFile(fileName,cardId)
  dispatch(_deleteFile(resp))
}

export const createTask = async (dispatch, { title, description, date, time, id, userId, workers }) => {
  const task = await NewtaskService.createTask(
    title, description, date, time, id, userId, workers
  )
  dispatch(_postTask(task.data.createdTask))
  dispatch(_getCurrentCart(task.data.result))
}

export const deletTask = async (dispatch, id, cardId) => {
  await NewtaskService.deleteTask(id, cardId).then(data => data.data)
}

export const getCurrentCartTasks = async (dispatch, id) => {
  await NewtaskService.getCurrentCartTasks(id).then(data => dispatch(_getCurrentCartTask(data.data)))
}

export const updateCardTask = async (dispatch, id, title, description, date, time, workers, userId) => {
  await NewtaskService.updateTask(id, title, description, date, time, workers, userId)
    .then(data => dispatch(_getCurrentCart(data.data)))
}
export const closeCardTask = async (dispatch, id, userId, cardId) => {
  const resp = await NewtaskService.closeTask(id, userId, cardId).then(data => data)

  dispatch(_getCurrentCart(resp.data.updatedCard))
  dispatch(_getCompanyTakenSpace(resp.data.takenSpace))
}
