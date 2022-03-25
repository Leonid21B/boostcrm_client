function clickButtonToShowCreateCard (stageId, setStageId) {
  return () => {
    setStageId(stageId)
  }
}

export {
  clickButtonToShowCreateCard
}
