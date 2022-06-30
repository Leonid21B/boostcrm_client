function sortCardsByDate (a, b) {
  return () => {
    if(!a?.tasks || !b?.tasks){
      return 0
    }
    const one = a.tasks.filter(t => new Date(t.date).getTime() < new Date().getTime()).length
    const two = b.tasks.filter(t => new Date(t.date).getTime() < new Date().getTime()).length

    const result = one > two ? 1 : -1

    return result
  }
}

function sortCardByTasksLength (a, b) {
  return () => {
    const result = a?.tasks?.length > b.tasks.length ? -1 : 1
    if(!result){
      return 0
    }
    return result
  }
}

export {
  sortCardByTasksLength,
  sortCardsByDate
}
