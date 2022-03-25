import MainService from 'requests/service/mainService'

function checkWhoManageAccess (userId, comandId) {
  const whoManageAccess = userId ? 'user' : comandId ? 'comand' : false
  return whoManageAccess
}
export {
  checkWhoManageAccess
}
