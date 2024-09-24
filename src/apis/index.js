// đang xử lý gọi API ở phần này nên giao diện bị trống
import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

// không dùng try catch vì ở phía FE ko nhất thiết phải làm như vậy đối với mọi request bởi gây thừa code nhiều
// catch lỗi tập trung bằng Interceptors trong axios
// Interceptors: dùng để đánh chặn vào giữa request và response để xử lý logic mà mình muốn

const api = axios.create({
  baseURL: API_ROOT
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// API dành cho board
export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await api.get(`/v1/boards/${boardId}`)
  return response.data
}

// API dành cho updateboard
export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const response = await api.put(`/v1/boards/${boardId}`, updateData)
  return response.data
}

// API dành cho updateboard
export const moveCardToDifferentColumnAPI = async (updateData) => {
  const response = await api.put('/v1/boards/supports/moving_card', updateData)
  return response.data
}

// API dành cho tạo mới column
export const createNewColumnAPI = async (newColumnData) => {
  const response = await api.post('/v1/columns', newColumnData)
  return response.data
}

// API dành cho updateboard
export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const response = await api.put(`/v1/columns/${columnId}`, updateData)
  return response.data
}
// API dành cho deleteboard
export const deleteColumnDetailsAPI = async (columnId) => {
  const response = await api.delete(`/v1/columns/${columnId}`)
  return response.data
}

// API dành cho tạo mới card
export const createNewCardAPI = async (newCardData) => {
  const response = await api.post('/v1/cards', newCardData)
  return response.data
}
