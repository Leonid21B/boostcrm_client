function parseToLocalDateFormat (zonedDateString, locale) {
  return new Date(zonedDateString).toLocaleDateString(locale)
}

function currentDateTimeWithOutSeconds () {

}

export {
  parseToLocalDateFormat
}
