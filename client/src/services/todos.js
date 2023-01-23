import axios from "axios"

const baseUrl = "http://localhost:3001/api/todos"

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const createTodo = async (newTodo) => {
  const response = await axios.post(baseUrl, newTodo)
  return response.data
}

const deleteTodo = async (todo) => {
  const response = await axios.delete(`${baseUrl}/${todo.id}`)
  return response.data
}
const exports = {
  getAll,
  createTodo,
  deleteTodo,
}

export default exports
