import { useState } from "react"
import { Button, Divider } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          onClick={toggleVisibility}
          colorScheme="teal"
          variant="ghost"
          leftIcon={<AddIcon />}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility} colorScheme="orange" variant="ghost">
          Cancel
        </Button>
      </div>
      <Divider />
    </div>
  )
}
export default Togglable
