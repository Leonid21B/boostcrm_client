import { setDateSeconds } from "./FormatDate"

const getColor = (task) => {
    const tasks = task.filter(t => t.status === 'active')
    
    if (tasks.filter(t => setDateSeconds(t.date) < setDateSeconds(new Date())).length > 0) {
      return 3
    }
    if (tasks.length) {
      return 2
    }
    return 1
  }
function getCount (task) {
    const tasks = task.filter(t => t.status === 'active')
    if (tasks.length > 0){
      return tasks.length
    }
    return 0
  }
const sortCards = (cards) => {
  let sortedCards = [...cards]
  sortedCards.sort((a,b) => getColor(b.tasks) - getColor(a.tasks))
  sortedCards.sort((a,b) => {
    if (getColor(a.tasks) != getColor(b.tasks)){
      return 0
    }else{
      return getCount(b.tasks) - getCount(a.tasks)
    }
  })
  console.log(sortedCards)
  return sortedCards
}

export default sortCards