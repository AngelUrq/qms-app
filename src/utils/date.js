export function changeDateFormat (date) {
  let dateFormat = require('dateformat')

  return dateFormat(date, 'yyyy/mm/dd, HH:MM:ss')
}
