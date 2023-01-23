import todoService from "./services/todos"
import TodoForm from "./components/TodoForm"
import TodosList from "./components/TodosList"
import { useState, useEffect } from "react"

function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    todoService.getAll().then((todos) => setTodos(todos))
  }, [])

  return (
    <div>
      <h1>Todos</h1>
      <TodosList todos={todos} setTodos={setTodos} />
      <TodoForm todos={todos} setTodos={setTodos} />
    </div>
  )
}

export default App
