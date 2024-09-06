// đang xử lý gọi API ở phần này nên giao diện bị trống
import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

// không dùng try catch vì ở phía FE ko nhất thiết phải làm như vậy đối với mọi request bởi gây thừa code nhiều
// catch lỗi tập trung bằng Interceptors trong axios
// Interceptors: dùng để đánh chặn vào giữa request và response để xử lý logic mà mình muốn

// API dành cho board
export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)

  // lưu ý: axios sẽ trả kết quả về qua property của nó là data
  return response.data
}

// API dành cho updateboard
export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  return response.data
}

// API dành cho updateboard
export const moveCardToDifferentColumnAPI = async (updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/supports/moving_card`, updateData)
  return response.data
}

// API dành cho tạo mới column
export const createNewColumnAPI = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
  return response.data
}

// API dành cho updateboard
export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
  return response.data
}

// API dành cho tạo mới card
export const createNewCardAPI = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  return response.data
}
