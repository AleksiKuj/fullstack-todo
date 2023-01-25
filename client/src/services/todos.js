import axios from "axios"
const baseUrl = "/api/todos"

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const createTodo = async (newTodo) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newTodo, config)
  return response.data
}

const deleteTodo = async (todo) => {
  const response = await axios.delete(`${baseUrl}/${todo.id}`)
  return response.data
}

const updateTodo = async (id, newTodo) => {
  const request = axios.patch(`${baseUrl}/${id}`, newTodo)
  return request.then((response) => response.data)
}
const exports = {
  getAll,
  createTodo,
  deleteTodo,
  updateTodo,
  setToken,
}

export default exports
