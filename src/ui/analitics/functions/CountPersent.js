
function countPercent (cards, stageCards) {
  if (stageCards != 0) {
    const result = stageCards ? Math.floor((cards / stageCards) * 100) : 0
    return result > 100 ? 100 : result
  }
  if (cards > 0) {
    return 100
  }
  return 0
}

export {
  countPercent
}
