import { RU_RU } from './Locale'

export const formatDate = date => new Date(date).toLocaleDateString(RU_RU, { weekday: 'short', hour: 'numeric', minute: 'numeric' })

export const formatFyllDate = date => new Date(date).toLocaleDateString(RU_RU, { day: 'numeric', month: 'numeric', year: 'numeric' })

export const formatFyllDateAndTime = date => new Date(date).toLocaleDateString(RU_RU, { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })

export const standartFormatDate = date => new Date(date).toLocaleDateString(RU_RU, { year: 'numeric', month: 'numeric', day: 'numeric' })

export const formatTime = date => new Date(date).toLocaleDateString(RU_RU, { weekday: 'short', hour: 'numeric', minute: 'numeric' })

export const formatDateDay = date => new Date(date).toLocaleDateString(RU_RU, { day: 'numeric', month: 'long' })

export const formatDateAndMonth = date => new Date(date).toLocaleDateString(RU_RU, { day: 'numeric', month: 'numeric' })

export const setDateSeconds = date => new Date(date).setSeconds(0, 0)
