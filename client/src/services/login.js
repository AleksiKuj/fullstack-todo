import axios from "axios"

const baseUrl = "https://fullstack-todo-oxw2.onrender.com/api/login"
//const baseUrl = "http://localhost:3001/api/login/"
const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const exports = { login }
export default exports
