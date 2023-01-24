import userService from "../services/users"
import { useState } from "react"
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Heading,
} from "@chakra-ui/react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"

const RegisterForm = ({ setUser, setMessage, setMessageType }) => {
  const [users, setUsers] = useState([0])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleRegister = async (event) => {
    event.preventDefault()
    await userService.getAll().then((users) => setUsers(users))

    if (users.findIndex((u) => u.username === username) !== -1) {
      setMessageType("error")
      setMessage("Username already exists")
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      return
    }
    try {
      const user = await userService.register({ username, password })

      setMessageType("success")
      setMessage(`${username} succesfully registered`)
      setUsername("")
      setPassword("")
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      console.log("testi")
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
        Register
      </Heading>
      <form onSubmit={handleRegister}>
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
            Register
          </Button>
        </div>
      </form>
    </div>
  )
}
export default RegisterForm
