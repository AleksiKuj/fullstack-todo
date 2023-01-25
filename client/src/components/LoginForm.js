import loginService from "../services/login"
import todoService from "../services/todos"
import RegisterForm from "./RegisterForm"
import { useState } from "react"
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Heading,
  Text,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Stack,
  Link,
} from "@chakra-ui/react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"

const LoginForm = ({ setUser, setMessage, setMessageType }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(true)
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
      {showLoginForm ? (
        <Flex minH={"100vh"} align={"center"} justify={"center"}>
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Sign in</Heading>
              <Text fontSize={"lg"} color={"gray.600"}>
                Test account credentials are test:test
              </Text>
            </Stack>
            <Box rounded={"lg"} boxShadow={"lg"} p={8}>
              <Stack spacing={4}>
                <form onSubmit={handleLogin}>
                  <FormControl id="usename">
                    <FormLabel>Username</FormLabel>
                    <Input
                      value={username}
                      onChange={handleUsernameChange}
                      _placeholder={{ color: "inherit" }}
                    />
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <InputGroup my="1em">
                      <Input
                        value={password}
                        type={showPassword ? "text" : "password"}
                        onChange={handlePasswordChange}
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
                  </FormControl>
                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      align={"start"}
                      justify={"space-between"}
                    >
                      <Link
                        color={"blue.400"}
                        onClick={() => setShowLoginForm(false)}
                      >
                        Don't have an account? Register here
                      </Link>
                    </Stack>
                    <Button
                      type="submit"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                    >
                      Sign in
                    </Button>
                  </Stack>
                </form>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      ) : (
        <RegisterForm
          showLoginForm={showLoginForm}
          setShowLoginForm={setShowLoginForm}
        />
      )}
    </div>
  )
}
export default LoginForm
