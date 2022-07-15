const randomArr = (arr,numb,postId) => {
  console.log('Array', arr, postId)
  let arrCopy = [...arr]
  arrCopy = arrCopy.filter(it => it.id != postId)
  console.log(arrCopy)
  if(arrCopy.length <= numb || !postId || !arr){
    return arrCopy
  }
  let resArr = []
  for(let i = numb; i > 0; i--){
    console.log(arrCopy)
    let ind = Math.floor(Math.random() * (arrCopy.length - 0))
    resArr.push(arrCopy[ind])
    arrCopy.splice(ind,1)
  }
  return resArr

}

export default randomArr