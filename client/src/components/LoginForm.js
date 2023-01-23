import loginService from "../services/login"
import todoService from "../services/todos"
import { useState } from "react"

const LoginForm = ({ setUser, setMessage, setMessageType }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem("loggedTodoUser", JSON.stringify(user))

      todoService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
      setMessageType("success")
      setMessage(`${user.username} logged in`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      console.log("error", exception)
      setMessageType("error")
      setMessage(exception.message)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }
  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <div>
          <p>
            username{" "}
            <input value={username} onChange={handleUsernameChange}></input>
          </p>
          <p>
            password{" "}
            <input
              value={password}
              type="password"
              onChange={handlePasswordChange}
            ></input>
          </p>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}
export default LoginForm
