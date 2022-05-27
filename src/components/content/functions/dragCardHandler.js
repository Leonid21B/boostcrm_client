import { Navigate } from 'react-router'
import CartService from 'requests/service/CartService'

export default function dragCardHandler (config) {
  const {
    currentStage,
    arrForCards,
    currentCard,
    setArrForCards,
    userId
  } = config

  function dragOverHandler (e) {
    e.preventDefault()
  }

  function dropCardHandler (e, stage) {
    if (currentStage !== stage._id) {
      const arr = [...arrForCards]
      arr.find(card => card._id === currentCard).stageId = stage._id
      setArrForCards(arr)
      CartService.updateCartStage(stage._id, currentCard, userId)
    }
  }

  return {
    dragOverHandler, dropCardHandler
  }
}
