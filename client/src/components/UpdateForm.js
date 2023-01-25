import { useState } from "react"
import todoService from "../services/todos"
import { useEffect } from "react"
import {
  Button,
  Input,
  Stack,
  Radio,
  RadioGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  ButtonGroup,
  Textarea,
} from "@chakra-ui/react"

const UpdateForm = ({
  setTodos,
  setMessage,
  setMessageType,
  isOpen,
  onClose,
  activeTodo,
  activeTodoTitle,
  activeTodoDescription,
}) => {
  const [todoTitle, setTodoTitle] = useState("")
  const [todoDescription, setTodoDescription] = useState("")
  const [priority, setPriority] = useState(2)

  useEffect(() => {
    //TODO: CLEAN CODE IMPORT ONLY ACTIVETODO AND USE ACTIVETODO.TITLE ACTIVETODO.DESC ..
    setTodoTitle(activeTodoTitle)
    setTodoDescription(activeTodoDescription)
    console.log(activeTodoTitle)
  }, [activeTodoTitle])

  const update = async (activeTodo, todoObject) => {
    try {
      await todoService.updateTodo(activeTodo.id, todoObject)
      todoService.getAll().then((todos) => setTodos(todos))
      setMessageType("success")
      setMessage(`${todoObject.title} edited`)
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
  const handleDescriptionChange = (event) => {
    setTodoDescription(event.target.value)
  }

  const handleSubmit = (activeTodo) => {
    onClose()
    try {
      console.log("submit", todoTitle)
      const todoObject = {
        title: todoTitle,
        description: todoDescription,
        priority: priority,
      }
      update(activeTodo, todoObject)
      setTodoTitle("")
      setTodoDescription("")
    } catch (exception) {
      console.log("exception")
    }
  }

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <Stack>
                <Input
                  value={todoTitle}
                  onChange={handleTitleChange}
                  placeholder="Title *"
                />
                <Textarea
                  value={todoDescription}
                  onChange={handleDescriptionChange}
                  placeholder="Description"
                />
                <RadioGroup onChange={setPriority} value={priority}>
                  <Text>Priority</Text>
                  <Stack direction="row">
                    <Radio value="1">None</Radio>
                    <Radio value="2">Normal</Radio>
                    <Radio value="3">Critical</Radio>
                  </Stack>
                </RadioGroup>
              </Stack>
            </form>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup gap={1}>
              <Button
                onClick={() => handleSubmit(activeTodo)}
                colorScheme="blue"
              >
                Save
              </Button>
              <Button onClick={onClose} variant="solid" colorScheme="red">
                Cancel
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
export default UpdateForm
