
function countMovementCard (allCards, stageCards) {
  const result = Math.floor((stageCards / allCards) * 100) || 0
  if(allCards == 0){
    return 0
  }
  return result
}

export {
  countMovementCard
}
