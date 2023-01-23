import todoService from "./services/todos"
import TodoForm from "./components/TodoForm"
import TodosList from "./components/TodosList"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import { useState, useEffect } from "react"

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
      <h1>Fullstack-Todo</h1>
      <Notification message={message} messageType={messageType} />
      <TodosList
        todos={todos}
        setTodos={setTodos}
        user={user}
        setMessage={setMessage}
        setMessageType={setMessageType}
      />
      <TodoForm
        todos={todos}
        setTodos={setTodos}
        setMessage={setMessage}
        setMessageType={setMessageType}
      />
      <button onClick={() => logOut()}>Log out</button>
    </div>
  )
}

export default App
