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
      <Heading as="h2" size="lg" my="2rem">
        {user.username}'s todos
      </Heading>
      <UnorderedList>
        {usersTodos().map((todo) => (
          <ListItem key={todo.id}>
            <Text overflow="hidden">{todo.title}</Text>
            <IconButton
              onClick={() => handleDelete(todo)}
              aria-label="Delete todo"
              colorScheme="red"
              variant="ghost"
              icon={<DeleteIcon />}
            />

            {/* <Button
              onClick={onOpen}
              colorScheme="red"
              variant="ghost"
              leftIcon={<DeleteIcon />}
            >
              delete
            </Button> */}

            {/* <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete Todo
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => handleDelete(todo)}
                      ml={3}
                    >
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog> */}
            <Divider />
          </ListItem>
        ))}
      </UnorderedList>
    </div>
  )
}
export default TodosList
