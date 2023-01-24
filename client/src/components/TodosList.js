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
  Stack,
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
    </div>
  )
}
export default TodosList
