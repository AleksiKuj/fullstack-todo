import loginService from "../services/login"
import todoService from "../services/todos"
import { useState } from "react"
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Heading,
} from "@chakra-ui/react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"

const LoginForm = ({ setUser, setMessage, setMessageType }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
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
      <Heading as="h2" size="xl" my="2rem">
        Log in
      </Heading>
      <form onSubmit={handleLogin}>
        <div>
          <Input
            value={username}
            onChange={handleUsernameChange}
            color="teal"
            placeholder="Username"
            _placeholder={{ color: "inherit" }}
          />
          <InputGroup my="1em">
            <Input
              value={password}
              type={showPassword ? "text" : "password"}
              onChange={handlePasswordChange}
              color="teal"
              placeholder="Password"
              _placeholder={{ color: "inherit" }}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <ViewOffIcon /> : <ViewIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button type="submit" colorScheme="teal" variant="solid">
            Login
          </Button>
        </div>
      </form>
    </div>
  )
}
export default LoginForm
