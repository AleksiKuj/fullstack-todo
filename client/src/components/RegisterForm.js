import userService from "../services/users"
import Notification from "./Notification"
import { useState, useEffect } from "react"
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Heading,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Checkbox,
  Stack,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"

const RegisterForm = ({ setUser, showLoginForm, setShowLoginForm }) => {
  const [users, setUsers] = useState([0])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  useEffect(() => {
    const getUsers = async () => {
      await userService.getAll().then((users) => setUsers(users))
    }
    getUsers()
  }, [])

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

      setMessage(`${username} succesfully registered`)
      setUsername("")
      setPassword("")
      setMessageType("success")
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
      <Notification message={message} messageType={messageType} />
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign up</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              It's 100% free ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <form onSubmit={handleRegister}>
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
                      onClick={() => setShowLoginForm(true)}
                    >
                      Already have an account? Sign in
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
                    Sign up
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </div>
  )
}
export default RegisterForm
