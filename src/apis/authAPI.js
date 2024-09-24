import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

const api = axios.create({
  baseURL: API_ROOT
})

export const loginApi = async (email, password) => {
  const response = await api.post('/v1/auth/login', { email, password })
  return response.data
}

export const registerApi = async (userData) => {
  const response = await api.post('/v1/auth/register', userData)
  return response.data
}