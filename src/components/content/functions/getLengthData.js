export default function getLengthData (arr, type) {
  switch (type) {
    case 'length':
      return (arr && arr.length) || 0
    case 'date': {
      // TODO: Порефакторить. В фильтре окажутся все непросроченные элементы
      const now = new Date()
      return arr.filter(t => {
        const itemDate = new Date(t.date)
        return itemDate.toLocaleDateString() === now.toLocaleDateString() &&
                itemDate.setSeconds(0, 0) >= now.setSeconds(0, 0)
      }).length
    }
    default:
      return undefined
  }
}
