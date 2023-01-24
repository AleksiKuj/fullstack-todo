import axios from "axios"

const baseUrl = "http://localhost:3001/api/users"
const register = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials)
    return response.data
  } catch (exception) {
    console.log(exception)
  }
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const exports = { register, getAll }
export default exports
