
function countMovementCard (allCards, stageCards) {
  const result = Math.floor((stageCards / allCards) * 100) || 0
  return result
}

export {
  countMovementCard
}
