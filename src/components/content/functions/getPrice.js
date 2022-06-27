const getPrice = (space) => {
  if(space == 1){
    return 499
  }
  return Math.floor(space*499-(space*499*0.1))
}

export default getPrice