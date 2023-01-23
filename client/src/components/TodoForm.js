import { useState } from "react"
import todoService from "../services/todos"

const TodoForm = ({ todos, setTodos }) => {
  const [todoTitle, setTodoTitle] = useState("")

  const add = async (todoObject) => {
    try {
      await todoService.createTodo(todoObject)

      todoService.getAll().then((todos) => setTodos(todos))
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleTitleChange = (event) => {
    setTodoTitle(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("submit", todoTitle)
    const todoObject = {
      title: todoTitle,
    }
    add(todoObject)
    setTodoTitle("")
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Add todo</h2>
        <p>todo title</p>
        <input value={todoTitle} onChange={handleTitleChange}></input>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
export default TodoForm
