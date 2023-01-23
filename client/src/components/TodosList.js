import todoService from "../services/todos"

const TodosList = ({ todos, setTodos, user, setMessage, setMessageType }) => {
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

  return (
    <div>
      <p>{`${user.username}'s Todos`}</p>
      <ul>
        {usersTodos().map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => deleteTodo(todo)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default TodosList
