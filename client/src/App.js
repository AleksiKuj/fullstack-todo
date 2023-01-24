import todoService from "./services/todos"
import TodoForm from "./components/TodoForm"
import TodosList from "./components/TodosList"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import Timer from "./components/Timer"
import { useState, useEffect } from "react"
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Heading,
  Flex,
  Spacer,
  Container,
} from "@chakra-ui/react"

function App() {
  const [todos, setTodos] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  useEffect(() => {
    todoService.getAll().then((todos) => setTodos(todos))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedTodoUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      todoService.setToken(user.token)
    }
  }, [])

  const logOut = () => {
    window.localStorage.removeItem("loggedTodoUser")
    window.location.reload()
  }

  if (!user) {
    return (
      <div>
        <Heading as="h1" size="2xl">
          Fullstack-Todo
        </Heading>
        <Notification message={message} messageType={messageType} />
        <LoginForm
          user={user}
          setUser={setUser}
          setMessage={setMessage}
          setMessageType={setMessageType}
        />
      </div>
    )
  }

  return (
    <div>
      <Container>
        {/* <Flex direction="column" align="center"> */}
        <Heading as="h1" size="2xl">
          Fullstack-Todo
        </Heading>

        <Notification message={message} messageType={messageType} />
        <TodosList
          todos={todos}
          setTodos={setTodos}
          user={user}
          setMessage={setMessage}
          setMessageType={setMessageType}
        />
        <Togglable buttonLabel="Create new todo">
          <TodoForm
            todos={todos}
            setTodos={setTodos}
            setMessage={setMessage}
            setMessageType={setMessageType}
          />
        </Togglable>
        <Timer />
        <Button onClick={() => logOut()} my={2}>
          Log out
        </Button>
        {/* </Flex> */}
      </Container>
    </div>
  )
}

export default App
