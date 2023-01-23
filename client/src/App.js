import todoService from "./services/todos"
import TodoForm from "./components/TodoForm"
import TodosList from "./components/TodosList"
import LoginForm from "./components/LoginForm"
import { useState, useEffect } from "react"

function App() {
  const [todos, setTodos] = useState([])
  const [user, setUser] = useState(null)

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
    return <LoginForm user={user} setUser={setUser} />
  }

  return (
    <div>
      <h1>Fullstack-Todo</h1>

      <TodosList todos={todos} setTodos={setTodos} />
      <TodoForm todos={todos} setTodos={setTodos} />
      <button onClick={() => logOut()}>Log out</button>
    </div>
  )
}

export default App
