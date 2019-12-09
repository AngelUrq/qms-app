import { adminRole } from '@/data.js'

export function isAdmin (user) {
  return user.role === adminRole
}

export function isGeneralResponsable (responsible, user) {
  let responsable = responsible.find(
    r => r.name.value === user._id
  )
  return responsable !== undefined
}
