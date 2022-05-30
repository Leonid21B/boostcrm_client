const taskText = (numb) => {
  switch(Math.floor((numb % 100) / 10)){
    case 1:
      return 'задач'
    default:
      switch(numb % 10){
        case 1:
          return 'задача'
        case 2:
          return 'задачи'
        case 3:
          return 'задачи'
        case 4:
          return 'задачи'
        case 5:
          return 'задач'
        case 6:
          return 'задач'
        case 7:
          return 'задач'
        case 8:
          return 'задач'
        case 9:
          return 'задач'
        case 0:
          return 'задач'
      }
  }
}

export default taskText