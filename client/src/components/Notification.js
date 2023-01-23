const Notification = ({ message, messageType }) => {
  const styles = {
    background: messageType !== "error" ? "green" : "red",
  }
  return (
    <div style={styles}>
      <p>{message}</p>
    </div>
  )
}
export default Notification
