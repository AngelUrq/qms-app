import axios from 'axios'
import { serverIP } from '@/data.js'

export function isLogged () {
  const actualToken = localStorage.getItem('token')
  return axios.post('http://' + serverIP + ':3000/api/users/isLogged', {}, {
    headers: { 'x-access-token': actualToken.toString() }
  })
    .then(response => response.data.auth)
    .catch(error => error.response.data.auth)
}
