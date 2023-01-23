const todosRouter = require("express").Router()
const Todo = require("../models/todo")
const User = require("../models/user")

todosRouter.get("", async (request, response) => {
  const todos = await Todo.find({}).populate("user", { username: 1, name: 1 })
  response.json(todos)
})
todosRouter.get("/:id", (request, response, next) => {
  Todo.findById(request.params.id)
    .then((todo) => {
      if (todo) {
        response.json(todo)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

todosRouter.post("/", async (request, response, next) => {
  const body = request.body

  const user = await User.findById(body.userId)

  const todo = new Todo({
    title: body.title,
    date: new Date(),
    user: user._id,
  })

  const savedTodo = await todo.save()
  user.todos = user.todos.concat(savedTodo._id)
  await user.save()

  response.json(savedTodo)
})
todosRouter.delete("/:id", (request, response, next) => {
  Todo.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

todosRouter.put("/:id", (request, response, next) => {
  const body = request.body
  const todo = { title: body.title }
  Todo.findByIdAndUpdate(request.params.id, todo, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedTodo) => {
      response.json(updatedTodo)
    })
    .catch((error) => next(error))
})

module.exports = todosRouter
