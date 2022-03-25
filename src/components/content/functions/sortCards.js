function sortCardsByDate (a, b) {
  return () => {
    const one = a.tasks.filter(t => new Date(t.date).getTime() < new Date().getTime()).length
    const two = b.tasks.filter(t => new Date(t.date).getTime() < new Date().getTime()).length

    const result = one > two ? 1 : -1

    return result
  }
}

function sortCardByTasksLength (a, b) {
  return () => {
    const result = a.tasks.length > b.tasks.length ? -1 : 1

    return result
  }
}

export {
  sortCardByTasksLength,
  sortCardsByDate
}
