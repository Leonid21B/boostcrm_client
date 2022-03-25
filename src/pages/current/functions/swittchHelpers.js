function switchHeler (helper) {
  switch (helper) {
    case 'update':
      return 'обновил(а) поле'
    case 'write':
      return 'написал(а)'
    case 'close':
      return 'закрыл(а) задачу'
    case 'updateT':
      return 'обновил(а) задачу'
    case 'update-stage':
      return 'перенес(ла) в этап'
    case 'close-card':
      return 'закрыл(а) сделку по причине'
    case 'restart-card':
      return 'востановил(а) сделку'
    case 'download':
      return 'загрузил(а) файл'
    case 'create-field':
      return 'создал(а) поле'
    case 'update-field':
      return 'обновил(а) поле'
    default:
      return 'создал(а) сделку'
  }
}

export {
  switchHeler
}
