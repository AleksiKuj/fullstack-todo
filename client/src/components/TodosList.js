import todoService from "../services/todos"
import UpdateForm from "./UpdateForm"
import { useState } from "react"
import {
  ListItem,
  UnorderedList,
  Heading,
  IconButton,
  Divider,
  Text,
  Stack,
  useDisclosure,
} from "@chakra-ui/react"
import { DeleteIcon, SettingsIcon } from "@chakra-ui/icons"

const TodosList = ({ todos, setTodos, user, setMessage, setMessageType }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [activeTodo, setActiveTodo] = useState(undefined)
  const [activeTodoTitle, setActiveTodoTitle] = useState("")
  const [activeTodoDescription, setActiveTodoDescription] = useState("")

  const deleteTodo = async (todo) => {
    try {
      await todoService.deleteTodo(todo)
      todoService.getAll().then((todos) => setTodos(todos))
      console.log(`${todo.title} removed`)
      setMessageType("success")
      setMessage(`Removed ${todo.title}`)
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

  const usersTodos = () => {
    return todos.filter((todo) => todo.user.username === user.username)
  }

  const handleDelete = (todo) => {
    deleteTodo(todo)
  }

  const priorities = (todo) => {
    if (todo.priority === 1) {
      return "none"
    } else if (todo.priority === 2) {
      return "normal"
    } else if (todo.priority === 3) {
      return "critical"
    }
  }
  const priorityColor = (todo) => {
    if (todo.priority === 1) {
      return "teal"
    } else if (todo.priority === 2) {
      return "black"
    } else if (todo.priority === 3) {
      return "purple"
    }
  }
  const x = (todo) => {
    setActiveTodo(todo)
    setActiveTodoTitle(todo.title)
    setActiveTodoDescription(todo.description)
    onOpen()
  }
  return (
    <div>
      <Heading as="h2" size="lg" my="1rem" color="#2B6CB0">
        {user.username}'s todolist
      </Heading>
      <Divider />
      <UnorderedList styleType="none" mb={5}>
        {usersTodos().map((todo) => (
          <ListItem key={todo.id}>
            <Stack>
              <Text overflow="hidden" fontSize="lg">
                {todo.title}
                <IconButton
                  onClick={() => handleDelete(todo)}
                  aria-label="Delete todo"
                  colorScheme="red"
                  variant="ghost"
                  icon={<DeleteIcon />}
                />
                <IconButton
                  onClick={() => x(todo)}
                  aria-label="Delete todo"
                  colorScheme="black"
                  variant="ghost"
                  icon={<SettingsIcon />}
                />
              </Text>
              <Text overflow="hidden" as="em" fontSize="md">
                {todo.description ? todo.description : ""}
              </Text>
              <Text
                overflow="hidden"
                as="em"
                fontSize="sm"
                color={priorityColor(todo)}
              >
                {todo.priority ? `Priority: ${priorities(todo)}` : ""}
              </Text>
            </Stack>
            <Divider />
          </ListItem>
        ))}
      </UnorderedList>
      <UpdateForm
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        activeTodo={activeTodo}
        todos={todos}
        setTodos={setTodos}
        activeTodoTitle={activeTodoTitle}
        activeTodoDescription={activeTodoDescription}
        setMessage={setMessage}
        setMessageType={setMessageType}
      />
    </div>
  )
}
export default TodosList
