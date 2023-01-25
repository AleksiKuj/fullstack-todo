import { Alert, AlertIcon } from "@chakra-ui/react"

const Notification = ({ message, messageType }) => {
  return (
    <div style={{ display: message ? "" : "none" }} className="notification">
      <Alert status={messageType ? messageType : "info"}>
        <AlertIcon />
        {message}
      </Alert>
    </div>
  )
}
export default Notification
