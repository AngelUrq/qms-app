let local = true // change this

export const backendURL = local ? 'http://localhost:3000' : 'http://18.228.190.107:3000'
export const production = false
export const dashboardRoute = '/dashboard'
export const loginRoute = '/login'
export const defaultRoute = '/'

export const adminRole = 'admin'
export const userRole = 'user'
export const defaultHTML = '<!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></head>'
