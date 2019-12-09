export function generateId () {
  return Date.now().toString() + (Math.random().toString(36).substr(2, 5)).toUpperCase()
}

export function isActivityFieldsCompleted (activity) {
  return activity.name !== '' && activity.responsable !== ''
}
