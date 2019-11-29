import axios from 'axios'
import { backendURL } from '@/data.js'

export function isLogged () {
  const actualToken = localStorage.getItem('token')
  if (actualToken === null) {
    return false
  }

  return axios.post(backendURL + '/api/users/isLogged', {}, {
    headers: { 'x-access-token': actualToken.toString() }
  })
    .then(response => response.data.auth)
    .catch(error => error.data)
}
