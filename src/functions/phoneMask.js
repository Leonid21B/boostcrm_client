 const phoneMaskValid = (inp,prev,pos,country) => {
  

  const baseStr = '1234567890'
   if(prev === null && inp === null){
    inp = `+${country}`
    prev = `+${country}`
  }
  let numb = inp.length > prev.length ? pos: pos + 1
  let strNew = ''
  let arr = []
  let prevArr = []
  
  for(let i in prev){
    if(baseStr.indexOf(prev[i]) != -1){
      prevArr.push(Number(prev[i]))
    }
  }
  for(let i in inp){
    if(baseStr.indexOf(inp[i]) != -1){
      arr.push(Number(inp[i]))
    }
  }
  if(country.length == 1){
    const positions = [1,4,5,6,9,10,11,13,14,16,17]
    if(prev.length < inp.length && arr.length > prevArr.length){
      if(pos == 1 ){
        numb = pos + 3
      }
      if(pos == 2 || pos == 3 || pos == 7 || pos == 8){
        numb = pos + 2
      }
      if(pos == 4 || pos == 9 || pos == 12 || pos == 13 || pos == 15 || pos == 16){
        numb = pos + 1
      }
      console.log(pos)
      console.log(numb)
    }
    if (arr[0] == 8 && country == '7'){
      arr[0] = 7
    }

    if(prev.length > inp.length && arr.length == prevArr.length){
      let curPos = inp.length
      for(let i = 0; positions[i] < pos; i++){
        curPos = i
      }
      arr.splice(curPos,1)
      //numb = curPos
    }

    if(arr.length > 18){
      arr.slice(0,18)
    }
    
    for(let i in arr){
      if(i == 0){
        strNew = '+' + arr[i] + ' ('
      }
      if(i == 1 || i == 2 || i == 4 || i == 5 || i == 7 || i == 9 || i == 10){
        strNew += arr[i]
      }
      if(i == 3){
        strNew = strNew + arr[i] + ') '
      }
      if(i == 6 || i == 8){
        strNew = strNew + arr[i] + ' '
      }

    
    }
   }else if(country.length == 2){
     const positions = [1,2,5,6,7,10,11,12,14,15,17,18]
     if(prev.length < inp.length && arr.length > prevArr.length){
      if(pos == 1){
        numb = pos + 1
      }
      /*if(pos == 2 ){
        numb = pos + 3
      }*/
      if(pos == 3 || pos == 4 || pos == 8 || pos == 9){
        numb = pos + 2
      }
      if(pos == 5 || pos == 10 || pos == 13 || pos == 14 || pos == 16 || pos == 17){
        numb = pos + 1
      }
      console.log(pos)
      console.log(numb)
    }

    if(prev.length > inp.length && arr.length == prevArr.length){
      let curPos = inp.length
      for(let i = 0; positions[i] < pos; i++){
        curPos = i
      }
      arr.splice(curPos,1)
      //numb = curPos
    }

    if(arr.length > 19){
      arr.slice(0,19)
    }
    
    for(let i in arr){
      if(i == 0){
        strNew = '+' + arr[i] 
      }
      if(i == 1){
        strNew = strNew + arr[i] + ' ('
      }
      
      if(i == 2 || i == 3 || i == 5 || i == 6 || i == 8 || i == 10 || i == 11){
        strNew += arr[i]
      }
      if(i == 4){
        strNew = strNew + arr[i] + ') '
      }
      if(i == 7 || i == 9){
        strNew = strNew + arr[i] + ' '
      }

    
    }
   }else if(country.length == 3){
     const positions = [1,2,3,6,7,8,11,12,13,15,16,18,19]
     if(prev.length < inp.length && arr.length > prevArr.length){
      if(pos == 1 ){
        numb = pos + 1
      }
      /*if(pos == 2 ){
        numb = pos + 3
      }*/
      if(pos == 4 || pos == 5 || pos == 9 || pos == 10){
        numb = pos + 2
      }
      if(pos == 6 || pos == 11 || pos == 14 || pos == 15 || pos == 17 || pos == 18){
        numb = pos + 1
      }
      console.log(pos)
      console.log(numb)
    }

    if(prev.length > inp.length && arr.length == prevArr.length){
      let curPos = inp.length
      for(let i = 0; positions[i] < pos; i++){
        curPos = i
      }
      arr.splice(curPos,1)
      //numb = curPos
    }

    if(arr.length > 20){
      arr.slice(0,20)
    }
    
    for(let i in arr){
      if(i == 0){
        strNew = '+' + arr[i] 
      }
      if(i == 1){
        strNew = strNew + arr[i]
      }
      if(i == 2){
        strNew = strNew + arr[i] + ' ('
      }
      if(i == 3 || i == 4 || i == 6 || i == 7 || i == 9 || i == 11 || i == 12){
        strNew += arr[i]
      }
      if(i == 5){
        strNew = strNew + arr[i] + ') '
      }
      if(i == 8 || i == 10){
        strNew = strNew + arr[i] + ' '
      }

    
    }
   }
   return {strNew,numb}
 }
 export default phoneMaskValid