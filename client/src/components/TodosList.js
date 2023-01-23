import todoService from "../services/todos"

const TodosList = ({ todos, setTodos }) => {
  const deleteTodo = async (todo) => {
    try {
      await todoService.deleteTodo(todo)
      todoService.getAll().then((todos) => setTodos(todos))
      console.log(`${todo.title} removed`)
    } catch (exception) {
      console.log(exception)
    }
  }
  return (
    <div>
      <ul>
        {todos.map((todo) => (
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
