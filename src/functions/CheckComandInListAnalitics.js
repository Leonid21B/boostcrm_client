function checkComandInList (listComands, dropDownComands, setComandList) {
  const difference = dropDownComands.filter(x => !listComands.find(trm => trm._id == x._id))
  setComandList(difference)
}

export {
  checkComandInList
}
