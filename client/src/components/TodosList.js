import todoService from "../services/todos"
import {
  Button,
  List,
  ListItem,
  UnorderedList,
  Input,
  InputGroup,
  InputRightElement,
  Heading,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  IconButton,
  Divider,
  Text,
} from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"
import { useRef } from "react"

const TodosList = ({ todos, setTodos, user, setMessage, setMessageType }) => {
  const cancelRef = useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()

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
    onClose()
  }

  return (
    <div>
      <Heading as="h2" size="lg" my="1rem" color="#2B6CB0">
        {user.username}'s todolist
      </Heading>
      <Divider />
      <UnorderedList styleType="none">
        {usersTodos().map((todo) => (
          <ListItem key={todo.id}>
            <Text overflow="hidden">
              {todo.title}
              <IconButton
                onClick={() => handleDelete(todo)}
                aria-label="Delete todo"
                colorScheme="red"
                variant="ghost"
                icon={<DeleteIcon />}
              />
            </Text>
            <Divider />
          </ListItem>
        ))}
      </UnorderedList>
    </div>
  )
}
export default TodosList
