import { useState } from "react"
import todoService from "../services/todos"
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Heading,
} from "@chakra-ui/react"

const TodoForm = ({ setTodos, setMessage, setMessageType }) => {
  const [todoTitle, setTodoTitle] = useState("")

  const add = async (todoObject) => {
    try {
      await todoService.createTodo(todoObject)
      todoService.getAll().then((todos) => setTodos(todos))
      setMessageType("success")
      setMessage(`Added ${todoObject.title}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
      setMessageType("error")
      setMessage(exception.message)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleTitleChange = (event) => {
    setTodoTitle(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    try {
      console.log("submit", todoTitle)
      const todoObject = {
        title: todoTitle,
      }
      add(todoObject)
      setTodoTitle("")
    } catch (exception) {
      console.log("exception")
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* <h2>Add todo</h2> */}
        {/* <p>todo title</p> */}
        <Input
          value={todoTitle}
          onChange={handleTitleChange}
          placeholder="Todo title"
        />
        <Button type="submit" colorScheme="teal" variant="ghost">
          Create
        </Button>
      </form>
    </div>
  )
}
export default TodoForm
